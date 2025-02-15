Clear-Host
Write-Host "[+] Updating system packages..." -ForegroundColor Green
Start-Sleep -Seconds 2
winget upgrade --all

Write-Host "[+] Installing dependencies..." -ForegroundColor Green
Start-Sleep -Seconds 2
winget install Git.NodeJS

Write-Host "[+] Cloning Hydrion-OwO-Farmer repository..." -ForegroundColor Green
git clone https://github.com/Hydradevx/Hydrion-OwO-Farmer.git
Set-Location Hydrion-OwO-Farmer

Write-Host "[+] Installing Node.js dependencies..." -ForegroundColor Green
npm install

Write-Host "[=] Installation complete! Starting Hydrion-OwO-Farmer..." -ForegroundColor Cyan
npm start