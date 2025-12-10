# PowerShell script to download yt-dlp and ffmpeg binaries for Windows
# Run this script before building the app

$binariesDir = Join-Path $PSScriptRoot "binaries"
New-Item -ItemType Directory -Force -Path $binariesDir | Out-Null

Write-Host "Downloading yt-dlp..." -ForegroundColor Cyan
$ytdlpUrl = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"
$ytdlpPath = Join-Path $binariesDir "yt-dlp.exe"
Invoke-WebRequest -Uri $ytdlpUrl -OutFile $ytdlpPath
Write-Host "  Downloaded to: $ytdlpPath" -ForegroundColor Green

Write-Host "Downloading FFmpeg..." -ForegroundColor Cyan
$ffmpegZipUrl = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip"
$ffmpegZipPath = Join-Path $binariesDir "ffmpeg.zip"
$ffmpegExtractPath = Join-Path $binariesDir "ffmpeg-temp"

Invoke-WebRequest -Uri $ffmpegZipUrl -OutFile $ffmpegZipPath
Write-Host "  Downloaded zip to: $ffmpegZipPath" -ForegroundColor Green

Write-Host "Extracting FFmpeg..." -ForegroundColor Cyan
Expand-Archive -Path $ffmpegZipPath -DestinationPath $ffmpegExtractPath -Force

# Find and copy the ffmpeg.exe file
$ffmpegExe = Get-ChildItem -Path $ffmpegExtractPath -Recurse -Filter "ffmpeg.exe" | Select-Object -First 1
$ffprobExe = Get-ChildItem -Path $ffmpegExtractPath -Recurse -Filter "ffprobe.exe" | Select-Object -First 1

if ($ffmpegExe) {
    Copy-Item $ffmpegExe.FullName -Destination (Join-Path $binariesDir "ffmpeg.exe")
    Write-Host "  Copied ffmpeg.exe to binaries folder" -ForegroundColor Green
}

if ($ffprobExe) {
    Copy-Item $ffprobExe.FullName -Destination (Join-Path $binariesDir "ffprobe.exe")
    Write-Host "  Copied ffprobe.exe to binaries folder" -ForegroundColor Green
}

# Clean up
Write-Host "Cleaning up..." -ForegroundColor Cyan
Remove-Item $ffmpegZipPath -Force
Remove-Item $ffmpegExtractPath -Recurse -Force

Write-Host "`nDone! Binaries downloaded to: $binariesDir" -ForegroundColor Green
Get-ChildItem $binariesDir | ForEach-Object { Write-Host "  - $($_.Name) ($([math]::Round($_.Length / 1MB, 2)) MB)" }
