# Build the store ZIP for Chrome Web Store and Microsoft Edge Add-ons (same MV3 package).
# Output file name includes the version from manifest.json.
# Run from project root (account-subscription-shortcuts).

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
Set-Location $here

$manifestPath = Join-Path $here 'manifest.json'
$manifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
$version = $manifest.version
if (-not $version) {
  Write-Error 'manifest.json is missing a version field.'
}

$items = @(
    'manifest.json',
    'background.js',
    'brand',
    'panel.html',
    'panel.css',
    'panel.js',
    'shortcuts-data.js',
    'icons'
)

$destName = "account-subscription-shortcuts-$version.zip"
$dest = Join-Path $here $destName
if (Test-Path $dest) { Remove-Item -LiteralPath $dest }

Compress-Archive -Path $items -DestinationPath $dest -Force
Write-Host "Created store package (Chrome + Edge): $dest"
Write-Host "Version in manifest: $version"
