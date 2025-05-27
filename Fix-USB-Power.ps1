
# Fix USB and Disk Power Management Settings (Scheduled Task Included)

$scriptName = "Fix-USB-Power"
$taskName = "Fix USB Power Settings"
$scriptPath = "$env:ProgramData\$scriptName.ps1"

Write-Host "`n🛠 Applying USB and disk power fixes..."

# 1. Disable USB Selective Suspend
powercfg -setacvalueindex SCHEME_CURRENT SUB_USB USBSELECTIVE SUSPEND_DISABLED
powercfg -setdcvalueindex SCHEME_CURRENT SUB_USB USBSELECTIVE SUSPEND_DISABLED
Write-Host "✔ USB Selective Suspend disabled."

# 2. Prevent hard disk sleep
powercfg -setacvalueindex SCHEME_CURRENT SUB_DISK DISKIDLE 0
powercfg -setdcvalueindex SCHEME_CURRENT SUB_DISK DISKIDLE 0
powercfg -SetActive SCHEME_CURRENT
Write-Host "✔ Hard disk sleep disabled."

# 3. Apply to all USB devices
$usbDevices = Get-PnpDevice -Class "USB" | Where-Object { $_.Status -eq "OK" }

foreach ($device in $usbDevices) {
    try {
        $instancePath = $device.InstanceId
        $regPath = "HKLM\SYSTEM\CurrentControlSet\Enum\$instancePath\Device Parameters"

        if (Test-Path $regPath) {
            Set-ItemProperty -Path $regPath -Name "EnhancedPowerManagementEnabled" -Value 0 -Force -ErrorAction SilentlyContinue
            Set-ItemProperty -Path $regPath -Name "AllowIdleIrpInD3" -Value 0 -Force -ErrorAction SilentlyContinue
            Write-Host "✔ Updated: $($device.FriendlyName)"
        }
    } catch {
        Write-Warning "⚠ Failed on: $($device.FriendlyName)"
    }
}

# 4. Save script to disk for scheduling
$scriptContent = @'
# Auto-applied USB fix
powercfg -setacvalueindex SCHEME_CURRENT SUB_USB USBSELECTIVE SUSPEND_DISABLED
powercfg -setdcvalueindex SCHEME_CURRENT SUB_USB USBSELECTIVE SUSPEND_DISABLED
powercfg -setacvalueindex SCHEME_CURRENT SUB_DISK DISKIDLE 0
powercfg -setdcvalueindex SCHEME_CURRENT SUB_DISK DISKIDLE 0
powercfg -SetActive SCHEME_CURRENT
'@

Set-Content -Path $scriptPath -Value $scriptContent -Encoding UTF8 -Force

# 5. Create scheduled task if not exists
if (-not (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue)) {
    Write-Host "`n📅 Creating scheduled task '$taskName' to run at user logon..."

    $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -File `"$scriptPath`""
    $trigger = New-ScheduledTaskTrigger -AtLogOn
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Description "Fix USB power settings at login" -User $env:USERNAME

    Write-Host "✔ Scheduled task created successfully."
} else {
    Write-Host "ℹ Task '$taskName' already exists. Skipping task creation."
}

Write-Host "`n✅ All changes applied. Please reboot for full effect."
