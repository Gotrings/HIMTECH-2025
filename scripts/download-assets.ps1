# Create images directory if it doesn't exist
$imagesDir = "public\images"
if (-not (Test-Path -Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

# URLs of the Leaflet marker assets
$assets = @(
    @{
        Url = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x.png"
        Filename = "marker-icon-2x.png"
    },
    @{
        Url = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon.png"
        Filename = "marker-icon.png"
    },
    @{
        Url = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png"
        Filename = "marker-shadow.png"
    }
)

# Download each asset
foreach ($asset in $assets) {
    $outputPath = Join-Path $imagesDir $asset.Filename
    Write-Host "Downloading $($asset.Url) to $outputPath"
    try {
        Invoke-WebRequest -Uri $asset.Url -OutFile $outputPath
        Write-Host "✓ Successfully downloaded $($asset.Filename)" -ForegroundColor Green
    }
    catch {
        Write-Host "! Failed to download $($asset.Filename): $_" -ForegroundColor Red
    }
}

Write-Host "\nAll assets have been processed." -ForegroundColor Cyan
