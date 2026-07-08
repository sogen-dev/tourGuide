$python = "C:\Users\sosos\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if (-not (Test-Path $python)) {
  Write-Error "Bundled Python not found: $python"
  exit 1
}

Write-Host "Serving on http://localhost:8000"
& $python -m http.server 8000
