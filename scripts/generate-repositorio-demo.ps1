$imageDir = "public/projects/servicio-screenshots"
$outputFile = "public/projects/videos/repositorio_demo.mp4"
$dur = 3
$fade = 0.5
$offsetStep = $dur - $fade
$fps = 30

$images = @(
  "01_landing_page.png",
  "02_login.png",
  "03_registro.png",
  "04_recuperar_clave.png",
  "05_restablecer_clave.png",
  "06_dashboard.png",
  "07_proyectos.png",
  "08_nuevo_proyecto.png",
  "09_buscar.png",
  "10_notificaciones.png",
  "11_usuarios.png",
  "12_configuracion.png",
  "13_home_page.png"
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

$finalSrc = $prev

$cmd = "ffmpeg $inputs-filter_complex `"${filterChain}`" -map `"[${finalSrc}]`" -r $fps -pix_fmt yuv420p -c:v libx264 -preset medium -crf 23 -y `"${outputFile}`""

Write-Output "Generating video..."
Write-Output $cmd
Invoke-Expression $cmd

if ($?) {
  Write-Output "Video generado: ${outputFile}"
}
