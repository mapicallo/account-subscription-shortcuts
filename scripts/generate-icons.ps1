# Generates toolbar PNGs (letter "A" on teal) for Account & Subscription Shortcuts.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

# Project root = parent of /scripts
$root = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $root 'icons'
if (-not (Test-Path $iconsDir)) { New-Item -ItemType Directory -Path $iconsDir | Out-Null }

$sizes = @(16, 32, 48, 128)
$bg = [System.Drawing.Color]::FromArgb(255, 14, 116, 144) # #0e7490
$fg = [System.Drawing.Color]::White

foreach ($size in $sizes) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.Clear($bg)

  $fontSize = [Math]::Max(6, [Math]::Floor($size * 0.52))
  $font = New-Object System.Drawing.Font('Segoe UI Semibold', $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rect = New-Object System.Drawing.RectangleF 0, 0, $size, $size
  $brush = New-Object System.Drawing.SolidBrush $fg
  $g.DrawString('A', $font, $brush, $rect, $sf)

  $out = Join-Path $iconsDir "icon$size.png"
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $font.Dispose()
  $brush.Dispose()
  $sf.Dispose()
  Write-Host "Wrote $out"
}
