Param (
	[string]$lat,
	[string]$lang
)

$Data_Str = $lat + ' ' + $lang
$Data_Bytes = [System.Text.Encoding]::ASCII.GetBytes($Data_Str)
curl -Uri 127.0.0.1:8080 -Method Post -Headers @{'Content-Type' = ''} -Body $Data_Bytes | select -Expand Content
