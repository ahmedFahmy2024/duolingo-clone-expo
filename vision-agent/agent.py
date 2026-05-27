"""
Dulaingo AI Language Teacher — Vision Agent service.

Transport : Stream Edge (WebRTC audio room)
LLM       : Gemini Live (speech-to-speech, ~100 ms latency)
Mode      : HTTP server via Runner + AgentLauncher

Run in dev   :  uv run agent.py run --call-id <call-id>
Run as server:  uv run agent.py serve --host 0.0.0.0 --port 8000
"""

from dotenv import load_dotenv

load_dotenv(".env")
load_dotenv("../.env")

from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.core.agents.agents import Instructions
from vision_agents.core.edge.events import (
    ParticipantJoinedEvent,
    ParticipantLeftEvent,
    TrackAddedEvent,
    TrackRemovedEvent,
)
from vision_agents.plugins import getstream, gemini


def _build_instructions(custom: dict) -> Instructions:
    """Build a session-specific system prompt from Stream call custom data."""
    language_code: str = custom.get("languageCode", "")
    ai_teacher_prompt: dict | None = custom.get("aiTeacherPrompt")
    goals: list = custom.get("goals", [])
    vocabulary: list = custom.get("vocabulary", [])
    phrases: list = custom.get("phrases", [])

    # Base instructions from file
    base = "@instructions.md"

    # Language
    language_name = {
        "es": "Spanish", "fr": "French", "ja": "Japanese", "de": "German",
    }.get(language_code, language_code or "the target language")

    parts: list[str] = [f"\n\nFor this session the student is learning **{language_name}**."]

    # Use the lesson-specific system prompt if provided
    if ai_teacher_prompt:
        system_prompt = ai_teacher_prompt.get("systemPrompt", "")
        if system_prompt:
            parts.append(f"\n\n## Lesson-specific instructions\n{system_prompt}")

        intro = ai_teacher_prompt.get("intro", "")
        if intro:
            parts.append(f'\n\nYour opening line for this lesson: "{intro}"')

        teaching_points = ai_teacher_prompt.get("teachingPoints", [])
        if teaching_points:
            points_text = "\n".join(f"- {p}" for p in teaching_points)
            parts.append(f"\n\n## Teaching points to cover\n{points_text}")

        check_questions = ai_teacher_prompt.get("checkQuestions", [])
        if check_questions:
            qs_text = "\n".join(f"- {q}" for q in check_questions)
            parts.append(f"\n\n## Comprehension check questions\n{qs_text}")

    # Goals
    if goals:
        goals_text = "\n".join(f"- {g}" for g in goals)
        parts.append(f"\n\n## Lesson goals\n{goals_text}")

    # Vocabulary to teach
    if vocabulary:
        vocab_lines = []
        for v in vocabulary:
            line = f"- {v.get('word', '')} → {v.get('translation', '')}"
            if v.get("pronunciation"):
                line += f" ({v['pronunciation']})"
            vocab_lines.append(line)
        parts.append(f"\n\n## Vocabulary for this lesson\n" + "\n".join(vocab_lines))

    # Phrases to teach
    if phrases:
        phrase_lines = [
            f"- {p.get('phrase', '')} → {p.get('translation', '')}"
            for p in phrases
        ]
        parts.append(f"\n\n## Phrases for this lesson\n" + "\n".join(phrase_lines))

    return Instructions(input_text=base + "".join(parts))


async def create_agent(**kwargs) -> Agent:
    """
    Factory called once per session by AgentLauncher.
    kwargs carries any metadata sent in the POST /sessions body — not used here
    because we read lesson data directly from the Stream call custom fields.
    """
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Luna", id="luna-teacher"),
        instructions="@instructions.md",
        llm=gemini.Realtime(model="gemini-3.1-flash-live-preview"),
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    """
    Called by AgentLauncher for each session.
    Reads the Stream call custom data to build a lesson-specific system prompt,
    then joins the call as an admin so it can publish audio.
    """
    call = await agent.create_call(call_type, call_id)

    # Fetch call details to read lesson custom data
    try:
        call_response = await call.get()
        custom: dict = call_response.data.call.custom or {}
    except Exception as e:
        print(f"[agent] Could not fetch call custom data: {e}")
        custom = {}

    # Rebuild instructions now that we have the call's custom data
    agent.instructions = _build_instructions(custom)

    # Log SFU events so we can see if/when the client joins from the agent's
    # perspective. EventManager requires type hints to register handlers.
    @agent.events.subscribe
    async def _on_participant_joined(event: ParticipantJoinedEvent):
        p = event.participant
        print(f"[agent event] ParticipantJoined: user={p.user_id} session={p.session_id}")

    @agent.events.subscribe
    async def _on_participant_left(event: ParticipantLeftEvent):
        p = event.participant
        print(f"[agent event] ParticipantLeft: user={p.user_id}")

    @agent.events.subscribe
    async def _on_track_added(event: TrackAddedEvent):
        print(f"[agent event] TrackAdded: {event!r}"[:300])

    @agent.events.subscribe
    async def _on_track_removed(event: TrackRemovedEvent):
        print(f"[agent event] TrackRemoved: {event!r}"[:300])


    # Join with admin capabilities so the agent can publish audio in audio_room.
    # participant_wait_timeout=0 means the agent doesn't block waiting for the
    # client to "appear" — the client joins first, then triggers this session.
    async with agent.join(call, participant_wait_timeout=0):
        # Go live so the audio_room allows the agent to publish
        try:
            await call.go_live()
        except Exception:
            pass  # Already live, or not required for this call type

        # Derive the opening line from the lesson, or fall back to a generic greeting
        ai_teacher_prompt: dict | None = custom.get("aiTeacherPrompt")
        intro: str = (
            ai_teacher_prompt.get("intro", "")
            if ai_teacher_prompt
            else ""
        )

        if intro:
            opening = (
                f"Say exactly this as your opening line, naturally and warmly, "
                f"then pause and wait for the student to respond: \"{intro}\""
            )
        else:
            language_name = {
                "es": "Spanish", "fr": "French", "ja": "Japanese", "de": "German",
            }.get(custom.get("languageCode", ""), "the target language")
            opening = (
                f"Greet the student warmly in one short, friendly sentence — "
                f"tell them you're their {language_name} teacher today and you're excited to get started. "
                f"Then ask them if they're ready to dive in."
            )

        await agent.simple_response(opening)
        await agent.finish()


if __name__ == "__main__":
    Runner(
        AgentLauncher(create_agent=create_agent, join_call=join_call),
    ).cli()
