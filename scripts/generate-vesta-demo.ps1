$imageDir = "public/projects/portfolio-screenshots"
$outputFile = "public/projects/videos/vesta_demo.mp4"
$dur = 3
$fade = 0.5
$offsetStep = $dur - $fade
$fps = 30

$images = @(
  "1_login.png",
  "2_dashboard.png",
  "3_products.png",
  "4_inventory.png",
  "5_sales.png",
  "6_purchases.png",
  "7_clients.png",
  "8_finances.png",
  "9_profit_loss.png",
  "10_users.png",
  "11_history.png",
  "12_landing.png"
)

$inputs = ""
$filterChain = ""
$prev = "v0"
$totalIn = $images.Count

for ($i = 0; $i -lt $totalIn; $i++) {
  $imgPath = Join-Path $imageDir $images[$i]
  $inputs += "-loop 1 -t $dur -i `"$imgPath`" "

  if ($i -eq 0) {
    $filterChain += "[0:v]setpts=PTS-STARTPTS,format=yuva420p,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#070711[v0];"
  } else {
    $inLabel = "${i}:v"
    $label = "v${i}"
    $combined = "c${i}"
    $offset = $i * $offsetStep
    $filterChain += "[${inLabel}]setpts=PTS-STARTPTS,format=yuva420p,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#070711[${label}];[${prev}][${label}]xfade=transition=fade:duration=${fade}:offset=${offset}[${combined}];"
    $prev = $combined
  }
}

$cmd = "ffmpeg $inputs-filter_complex `"${filterChain}`" -map `"[${prev}]`" -r $fps -pix_fmt yuv420p -c:v libx264 -preset medium -crf 23 -y `"${outputFile}`""

Write-Output "Generando video Vesta Retail ERP..."
Invoke-Expression $cmd

if ($?) {
  Write-Output "Video generado: ${outputFile}"
}
