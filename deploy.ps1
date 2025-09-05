#!/usr/bin/env pwsh
# 小石榴图文社区 Docker 一键部署脚本
# PowerShell 版本

param(
    [switch]$Build,
    [switch]$Stop,
    [switch]$Clean,
    [switch]$Logs,
    [switch]$Status,
    [switch]$Help
)

# 颜色输出函数
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# 显示帮助信息
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
    Write-ColorOutput ""
    Write-ColorOutput "示例:" "Green"
    Write-ColorOutput "  .\deploy.ps1          # 启动服务" "White"
    Write-ColorOutput "  .\deploy.ps1 -Build   # 重新构建并启动" "White"
    Write-ColorOutput "  .\deploy.ps1 -Stop    # 停止服务" "White"
}

# 检查Docker是否安装
function Test-Docker {
    try {
        docker --version | Out-Null
        docker-compose --version | Out-Null
        return $true
    }
    catch {
        Write-ColorOutput "错误: 未找到 Docker 或 Docker Compose" "Red"
        Write-ColorOutput "请先安装 Docker Desktop: https://www.docker.com/products/docker-desktop" "Yellow"
        return $false
    }
}

# 检查环境变量文件
function Test-EnvFile {
    if (-not (Test-Path ".env")) {
        if (Test-Path ".env.docker") {
            Write-ColorOutput "复制 .env.docker 到 .env" "Yellow"
            Copy-Item ".env.docker" ".env"
        } else {
            Write-ColorOutput "警告: 未找到 .env 文件，将使用默认配置" "Yellow"
        }
    }
}

# 启动服务
function Start-Services {
    Write-ColorOutput "启动小石榴图文社区服务..." "Green"
    
    if ($Build) {
        Write-ColorOutput "重新构建镜像..." "Yellow"
        docker-compose down
        docker-compose build --no-cache
    }
    
    docker-compose up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "服务启动成功!" "Green"
        Write-ColorOutput ""
        Write-ColorOutput "访问地址:" "Cyan"
        Write-ColorOutput "  前端: http://localhost" "White"
        Write-ColorOutput "  后端API: http://localhost:3001" "White"
        Write-ColorOutput "  数据库: localhost:3306" "White"
        Write-ColorOutput ""
        Write-ColorOutput "使用 '.\deploy.ps1 -Logs' 查看日志" "Yellow"
        Write-ColorOutput "使用 '.\deploy.ps1 -Status' 查看服务状态" "Yellow"
    } else {
        Write-ColorOutput "服务启动失败!" "Red"
        Write-ColorOutput "请检查日志: docker-compose logs" "Yellow"
    }
}

# 停止服务
function Stop-Services {
    Write-ColorOutput "停止小石榴图文社区服务..." "Yellow"
    docker-compose down
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "服务已停止" "Green"
    } else {
        Write-ColorOutput "停止服务时出现错误" "Red"
    }
}

# 清理资源
function Clean-Resources {
    Write-ColorOutput "警告: 此操作将删除所有容器、镜像和数据!" "Red"
    $confirm = Read-Host "确认继续? (y/N)"
    
    if ($confirm -eq "y" -or $confirm -eq "Y") {
        Write-ColorOutput "清理Docker资源..." "Yellow"
        docker-compose down -v --rmi all
        docker system prune -f
        Write-ColorOutput "清理完成" "Green"
    } else {
        Write-ColorOutput "操作已取消" "Yellow"
    }
}

# 查看日志
function Show-Logs {
    Write-ColorOutput "查看服务日志 (按 Ctrl+C 退出):" "Cyan"
    docker-compose logs -f
}

# 查看状态
function Show-Status {
    Write-ColorOutput "服务状态:" "Cyan"
    docker-compose ps
    Write-ColorOutput ""
    Write-ColorOutput "资源使用情况:" "Cyan"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

# 主逻辑
if ($Help) {
    Show-Help
    exit 0
}

if (-not (Test-Docker)) {
    exit 1
}

Test-EnvFile

switch ($true) {
    $Stop { Stop-Services }
    $Clean { Clean-Resources }
    $Logs { Show-Logs }
    $Status { Show-Status }
    default { Start-Services }
}

Write-ColorOutput "操作完成" "Green"