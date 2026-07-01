@echo off
REM Xegents OS - agency UI demo launcher (static, no build step)
cd /d "%~dp0"
echo Starting Xegents OS demo at http://localhost:8765 ...
start "" "http://localhost:8765"
python -m http.server 8765
