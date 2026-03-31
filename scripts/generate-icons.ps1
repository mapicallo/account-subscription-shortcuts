# Generates toolbar/store PNGs (16-128) from icons/icon-master.png.
# Replace icon-master.png with a square PNG source, then run this script.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $root 'icons'
$masterPath = Join-Path $iconsDir 'icon-master.png'

if (-not (Test-Path $iconsDir)) { New-Item -ItemType Directory -Path $iconsDir | Out-Null }

if (-not (Test-Path $masterPath)) {
  Write-Error "Missing icon-master.png under icons/. Add a square PNG, then re-run."
}

$sizes = @(16, 32, 48, 128)
$src = [System.Drawing.Image]::FromFile((Resolve-Path $masterPath))

try {
  foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($src, 0, 0, $size, $size)

    $outPath = Join-Path $iconsDir ('icon' + $size + '.png')
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output ('Wrote ' + $outPath)
  }
}
finally {
  $src.Dispose()
}
