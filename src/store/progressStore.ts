import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLesson } from "@/data/lessons";

export type LessonStatus = "not_started" | "in_progress" | "completed";

interface ProgressState {
  completedLessons: string[];
  inProgressLesson: string | null;
  totalXP: number;
  _hasHydrated: boolean;
  _mockSeeded: boolean;
  markCompleted: (lessonId: string, xp: number) => void;
  setInProgress: (lessonId: string | null) => void;
  getLessonStatus: (lessonId: string) => LessonStatus;
  setHasHydrated: (value: boolean) => void;
  seedMockProgress: (completedIds: string[], inProgressId: string) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      inProgressLesson: null,
      totalXP: 0,
      _hasHydrated: false,
      _mockSeeded: false,

      markCompleted: (lessonId, xp) =>
        set((state) => {
          const wasAlreadyCompleted = state.completedLessons.includes(lessonId);
          return {
            completedLessons: wasAlreadyCompleted
              ? state.completedLessons
              : [...state.completedLessons, lessonId],
            inProgressLesson:
              state.inProgressLesson === lessonId ? null : state.inProgressLesson,
            totalXP: wasAlreadyCompleted ? state.totalXP : state.totalXP + xp,
          };
        }),

      setInProgress: (lessonId) => set({ inProgressLesson: lessonId }),

      getLessonStatus: (lessonId): LessonStatus => {
        const { completedLessons, inProgressLesson } = get();
        if (completedLessons.includes(lessonId)) return "completed";
        if (inProgressLesson === lessonId) return "in_progress";
        return "not_started";
      },

      setHasHydrated: (value) => set({ _hasHydrated: value }),

      seedMockProgress: (completedIds, inProgressId) =>
        set((state) => {
          if (state._mockSeeded) return {};
          const totalXP = completedIds.reduce((sum, id) => {
            return sum + (getLesson(id)?.xpReward ?? 0);
          }, 0);
          return {
            completedLessons: completedIds,
            inProgressLesson: inProgressId,
            totalXP,
            _mockSeeded: true,
          };
        }),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
