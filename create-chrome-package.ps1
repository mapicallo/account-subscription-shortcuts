# Build ZIP for Chrome Web Store. Run from project root (account-subscription-shortcuts).

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
Set-Location $here

$items = @(
    'manifest.json',
    'background.js',
    'panel.html',
    'panel.css',
    'panel.js',
    'shortcuts-data.js',
    'icons'
)

$dest = Join-Path $here 'account-subscription-shortcuts-chrome.zip'
if (Test-Path $dest) { Remove-Item $dest }

Compress-Archive -Path $items -DestinationPath $dest -Force
Write-Host "Created: $dest"
