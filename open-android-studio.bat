@echo off
:: Launch Android Studio with node and JAVA_HOME so Gradle daemon can find them
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "PATH=C:\Program Files\nodejs;%JAVA_HOME%\bin;%PATH%"
start "" "C:\Program Files\Android\Android Studio\bin\studio64.exe"
