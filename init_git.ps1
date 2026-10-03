# Initialize Git repository for HomeGuard
$gitCmd = if (Get-Command git -ErrorAction SilentlyContinue) { "git" } elseif (Test-Path "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe") { "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe" } else { $null }

if ($gitCmd) {
    & $gitCmd init
    & $gitCmd config user.name "Shubham"
    & $gitCmd config user.email "shubham@homeguard.local"
    & $gitCmd add .
    & $gitCmd commit -m "feat: initial commit of HomeGuard - Smart Living. Safer Home. with Gemini AI Copilot"
    Write-Host "Git repository initialized and committed successfully!"
    & $gitCmd status
} else {
    Write-Host "Git executable not found yet. Once downloaded, run this script to commit."
}
