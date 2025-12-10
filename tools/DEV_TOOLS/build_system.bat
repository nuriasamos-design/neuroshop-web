@echo off
REM ========================================
REM NEUROSHOT 3.0 - BUILD SYSTEM
REM Sistema de construcción offline-ready
REM ========================================

echo.
echo ========================================
echo  NEUROSHOT 3.0 - BUILD SYSTEM
echo ========================================
echo.

REM Crear estructura de carpetas
echo [1/6] Creando estructura de carpetas...
mkdir "NeuroShot_System" 2>nul
mkdir "NeuroShot_System\App" 2>nul
mkdir "NeuroShot_System\Data" 2>nul
mkdir "NeuroShot_System\Tools" 2>nul
mkdir "NeuroShot_System\Media" 2>nul
mkdir "NeuroShot_System\Media\videos" 2>nul
mkdir "NeuroShot_System\Media\audios" 2>nul
mkdir "NeuroShot_System\Media\infografias" 2>nul
mkdir "NeuroShot_System\Backend" 2>nul
mkdir "NeuroShot_System\Documentation" 2>nul
echo OK - Estructura creada

REM Copiar aplicación web
echo.
echo [2/6] Copiando aplicación web...
xcopy "NEUROSHOT_APP_BUNDLE\*.html" "NeuroShot_System\App\" /Y /Q
xcopy "NEUROSHOT_APP_BUNDLE\css" "NeuroShot_System\App\css\" /E /Y /Q
xcopy "NEUROSHOT_APP_BUNDLE\js" "NeuroShot_System\App\js\" /E /Y /Q
xcopy "NEUROSHOT_APP_BUNDLE\assets" "NeuroShot_System\App\assets\" /E /Y /Q
copy "NEUROSHOT_APP_BUNDLE\manifest.json" "NeuroShot_System\App\" /Y
copy "NEUROSHOT_APP_BUNDLE\sw.js" "NeuroShot_System\App\" /Y
echo OK - App copiada

REM Copiar datos
echo.
echo [3/6] Copiando bases de datos...
copy "NEUROSHOT_APP_BUNDLE\Data\*.json" "NeuroShot_System\Data\" /Y
copy "99_SYSTEM_TOOLS\*.json" "NeuroShot_System\Data\" /Y
copy "99_SYSTEM_TOOLS\*.js" "NeuroShot_System\Data\" /Y
echo OK - Datos copiados

REM Copiar herramientas Excel
echo.
echo [4/6] Generando herramientas Excel...
python NEUROSHOT_APP_BUNDLE\scripts\calculadora_volumen.py
python NEUROSHOT_APP_BUNDLE\scripts\analizador_agrupaciones.py
python NEUROSHOT_APP_BUNDLE\scripts\matriz_decision_tactica.py
move "NEUROSHOT_APP_BUNDLE\Data\*.xlsx" "NeuroShot_System\Tools\" 2>nul
echo OK - Herramientas generadas

REM Copiar media (si existe)
echo.
echo [5/6] Copiando bibliotecas multimedia...
if exist "03_LABORATORIO_AUDIO" (
    xcopy "03_LABORATORIO_AUDIO\*.mp3" "NeuroShot_System\Media\audios\" /Y /Q
    xcopy "03_LABORATORIO_AUDIO\*.m4a" "NeuroShot_System\Media\audios\" /Y /Q
)
if exist "06_VIDEOTECA_TECNICA" (
    xcopy "06_VIDEOTECA_TECNICA\*.mp4" "NeuroShot_System\Media\videos\" /Y /Q
)
if exist "05_INFOGRAFIAS" (
    xcopy "05_INFOGRAFIAS\*.svg" "NeuroShot_System\Media\infografias\" /Y /Q
    xcopy "05_INFOGRAFIAS\*.pdf" "NeuroShot_System\Media\infografias\" /Y /Q
)
echo OK - Media copiada

REM Copiar scripts backend
echo.
echo [6/6] Copiando scripts backend...
copy "NEUROSHOT_APP_BUNDLE\scripts\*.py" "NeuroShot_System\Backend\" /Y
echo OK - Backend copiado

echo.
echo ========================================
echo  BUILD COMPLETADO
echo ========================================
echo.
echo Sistema exportado a: NeuroShot_System\
echo.
echo Próximos pasos:
echo 1. Instalar dependencias: pip install pandas openpyxl xlsxwriter numpy
echo 2. Abrir App\index.html en el navegador
echo 3. Opcional: Copiar a USB para uso portable
echo.
pause
