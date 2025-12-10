$path = "g:\Mi unidad\00_NEUROSHOT_ACADEMY_MASTER\neuroshot_dashboard.html"
if (Test-Path $path) {
    Start-Process $path
    Write-Host "Lanzando NeuroShot Dashboard..." -ForegroundColor Green
} else {
    Write-Host "Error: No se encuentra el archivo en $path" -ForegroundColor Red
}