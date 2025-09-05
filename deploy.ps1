#!/usr/bin/env pwsh
param(
    [switch]$Build,
    [switch]$Stop,
    [switch]$Clean,
    [switch]$Logs,
    [switch]$Status,
    [switch]$Help
)

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Show-Help {
    Write-ColorOutput "小石榴图文社区 Docker 部署脚本" "Cyan"
    Write-ColorOutput "用法: .\deploy.ps1 [选项]" "Yellow"
    Write-ColorOutput "" 
    Write-ColorOutput "选项:" "Green"
    Write-ColorOutput "  -Build    强制重新构建镜像并启动服务" "White"
    Write-ColorOutput "  -Stop     停止所有服务" "White"
    Write-ColorOutput "  -Clean    清理所有容器、镜像和数据卷" "White"
    Write-ColorOutput "  -Logs     查看服务日志" "White"
    Write-ColorOutput "  -Status   查看服务状态" "White"
    Write-ColorOutput "  -Help     显示此帮助信息" "White"
}

function Test-Docker {
    try {
        docker --version | Out-Null
        docker-compose --version | Out-Null
        return $true
    }
    catch {
        Write-ColorOutput "错误: 未找到 Docker 或 Docker Compose" "Red"
        return $false
    }
}

function Start-Services {
    Write-ColorOutput "启动小石榴图文社区服务..." "Green"
    docker-compose -p xiaoshiliu up -d
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "服务启动成功!" "Green"
    } else {
        Write-ColorOutput "服务启动失败!" "Red"
    }
}

if ($Help) {
    Show-Help
    exit 0
}

if (-not (Test-Docker)) {
    exit 1
}

switch ($true) {
    $Stop { Write-ColorOutput "停止服务..." "Yellow"; docker-compose -p xiaoshiliu down }
    default { Start-Services }
}

Write-ColorOutput "操作完成" "Green"
