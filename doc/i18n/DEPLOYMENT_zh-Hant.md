# 部署指南

本文件提供了 XiaoShiLiu 圖文社區專案部署流程的詳細描述以及配置說明。

## 部署方法

專案支援兩種部署方法：

1. **Docker 一鍵部署**（推薦）- 簡單快捷，適合生產環境
2. **傳統部署** - 手動配置，適合開發環境

---

## 🐳 Docker 一鍵部署（推薦）

### 環境要求

- Docker >= 20.0
- Docker Compose >= 2.0
- 可用記憶體 >= 2GB
- 可用磁碟空間 >= 5GB

### 圖像和版本說明

| 構件 | 圖像/來源 | 版本/標籤 | 說明 |
|-----------|--------------|-------------|-------------|
| 數據庫 | mysql | 8.0 | 使用官方圖像 `mysql:8.0`，默認配置為 utf8mb4 |
| 後端運行時 | node | 18-alpine | `express-project/Dockerfile` 使用 `node:18-alpine` |
| 前端建置 | node | 18-alpine | `vue3-project/Dockerfile` 在建置階段使用它 |
| 前端運行時 | nginx | alpine | 使用 `nginx:alpine` 提供靜態文件 |
| Compose 健康檢查 | wget | - | 前端健康檢查使用 `wget --spider http://localhost/` |

> 警告：上述版本與 `docker-compose.yml` 和前端 `Dockerfile` 一致；如需進行修改，請相應調整相關文件和文件。

### 快速啟動

#### 1. 備份專案

```bash
git clone https://github.com/ZTMYO/XiaoShiLiu.git
cd XiaoShiLiu
```

#### 2. 配置環境變數（選擇性）

```bash
# 選擇性：如果您有自定義環境變數，可以建立一個 .env 文件
# 此儲存庫未提供 .env.docker，除非有特殊需求，您可以跳過並使用 docker-compose.yml 中的默認值
```

#### 3. 一鍵啟動

**Windows 使用者：**

```powershell
# 啟動服務
.\deploy.ps1

# 重新編譯並啟動
.\deploy.ps1 -Build

# 啟動並種植範例數據（選擇性）
.\deploy.ps1 -Build -Seed
# 或者服務啟動後分別種植數據
.\deploy.ps1 -Seed

# 檢查服務狀態
.\deploy.ps1 -Status

# 檢視日誌
.\deploy.ps1 -Logs

# 停止服務
.\deploy.ps1 -Stop
```

**Linux/macOS 使用者：**

```bash
# 賦予腳本執行權限
chmod +x deploy.sh

# 啟動服務
./deploy.sh

# 重新編譯並啟動
./deploy.sh --build

# 檢查服務狀態
./deploy.sh --status

# 檢視日誌
./deploy.sh --logs

# 停止服務
./deploy.sh --stop
```

#### 4. 適用應用程序

服務成功啟動後，您可以通过以下地址訪問應用程序：

| 服務 | 地址 | 說明 |
|---------|---------|-------------|
| 前端介面 | http://localhost:8080 | 主要訪問入口 |
| 後端 API | http://localhost:3001 | API 服務 |
| 數據庫 | localhost:3307 | MySQL 數據庫 |

### Docker 部署架構

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端          │    │    後端          │    │     MySQL       │
│   (Nginx)       │◄───┤   (Express)     │◄───┤   (數據庫)    │
│   網路通訊端口: 80 │    │   網路通訊端口: 3001 │    │   網路通訊端口: 3306 │
└─────────────────┘    └─────────────────┘    └─────────────────┘

### 環境變數配置

此專案使用 `.env` 文件進行配置，前端和後端有分別的環境設定：

#### 後端環境變數配置 (express-project/.env)

```env
# 伺服器配置
PORT=3001
NODE_ENV=development

# JWT 配置
JWT_SECRET=xiaoshiliu_secret_key_2025
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# 數據庫配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=xiaoshiliu
DB_PORT=3306

# 上傳配置
UPLOAD_MAX_SIZE=50mb
# 圖片上傳策略 (local: 本地儲存，imagehost: 第三方圖片伺服器)
UPLOAD_STRATEGY=imagehost

# 本地儲存配置
LOCAL_UPLOAD_DIR=uploads
LOCAL_BASE_URL=http://localhost:3001

# 第三方圖片伺服器配置
IMAGEHOST_API_URL=https://api.xinyew.cn/api/jdtc
IMAGEHOST_TIMEOUT=60000
# 上傳策略: local (本地儲存) 或 imagehost (第三方圖片伺服器)
UPLOAD_STRATEGY=local

# 本地儲存配置
LOCAL_UPLOAD_DIR=uploads
LOCAL_BASE_URL=http://localhost:3001

# 第三方圖片伺服器配置
IMAGEHOST_API_URL=https://api.xinyew.cn/api/jdtc
IMAGEHOST_TIMEOUT=60000

# API 配置
API_BASE_URL=http://localhost:3001

# CORS 配置
CORS_ORIGIN=http://localhost:5173
```

#### 前端環境變數配置 (vue3-project/.env)

```env
# API 基底網址配置
VITE_API_BASE_URL=http://localhost:3001/api

# 使用真實的 API
VITE_USE_REAL_API=true

# 應用程式標題
VITE_APP_TITLE=Small石榴 Image and Text Community
```

#### Docker 環境變數說明

當使用 Docker 部署時，環境變數通過 `docker-compose.yml` 配置：

```env
# 數據庫配置 (Docker 環境)
DB_HOST=mysql
DB_USER=xiaoshiliu_user
DB_PASSWORD=123456
DB_NAME=xiaoshiliu

# JWT 配置
JWT_SECRET=xiaoshiliu_secret_key_2025_docker
JWT_EXPIRES_IN=7d

# 上傳配置
UPLOAD_MAX_SIZE=50mb
# 圖片上傳策略 (local: 本地儲存，imagehost: 第三方圖片伺服器)
UPLOAD_STRATEGY=imagehost

# API 配置
API_BASE_URL=http://localhost:3001
```

### 常見指令

```bash
# 檢視服務狀態
docker-compose ps

# 檢視服務日誌
docker-compose logs -f

# 重啟特定服務
docker-compose restart backend

# 過入容器（Alpine 圖像通常沒有 bash，請使用 sh）
docker-compose exec backend sh
# 或過入 MySQL 客戶端
docker-compose exec mysql mysql -u root -p

# 備份數據庫
docker-compose exec mysql mysqldump -u root -p xiaoshiliu > backup.sql

# 恢復數據庫
docker-compose exec -T mysql mysql -u root -p xiaoshiliu < backup.sql
```

### 資料持久化

使用資料卷進行 Docker 部署以實現資料持久化：

- `mysql_data`：MySQL 數據庫文件
- `backend_uploads`：後端上傳文件

### 解決問題

#### 1. 通訊協定衝突

如果您遇到通訊協定衝突，您可以修改 `docker-compose.yml` 文件中的端口映射：

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # 修改前端端口
  backend:
    ports:
      - "3002:3001"  # 修改後端端口
```

#### 2. 記憶體不足

確保系統有足夠的記憶體，您可以使用以下命令檢查資源使用情況：

```bash
docker stats
```

#### 3. 數據庫連接失敗 / 數據注入

- 檢查數據庫服務是否正常啟動：

```bash
docker-compose logs mysql
```

- 注入範例數據（Windows）:
```powershell
.\deploy.ps1 -Seed
```

- 手動執行注入範例數據：
```bash
docker-compose exec -T backend node scripts/generate-data.js
```

#### 4. 文件上傳權限問題

**問題現象**：
- 前端上傳文件時返回 400 錯誤
- 後端日誌顯示：`EACCES: permission denied, open '/app/uploads/xxx.png'`

**原因分析**：
上傳目錄內部於 Docker 容器中的權限問題，目錄屬於 root 用戶，但應用程式在 nodejs 用戶下運行。

**解決方案**：

1. **檢查上傳目錄權限**：
```bash
docker-compose exec backend ls -la /app/uploads
```

2. **修復權限問題**：
```bash
# 使用 root 用戶修改目錄所有者
docker-compose exec --user root backend chown -R nodejs:nodejs /app/uploads
```

3. **驗證權限修復**：
```bash
# 確認目錄現在屬於 nodejs 用戶
docker-compose exec backend ls -la /app/uploads
```

**預防措施**：
- 確保在 Dockerfile 中正確設置上傳目錄的權限
- 在容器啟動時自動修復權限問題

#### 5. 上傳策略配置

項目支持兩種文件上傳策略：

**本地儲存模式**（推薦用於開發和小型部署）:
```yaml
# 在 docker-compose.yml 中設置
environment:
  UPLOAD_STRATEGY: local
```

**第三方圖像托管模式**（推薦用於生產環境）:
```yaml
# 在 docker-compose.yml 中設置
environment:
  UPLOAD_STRATEGY: imagehost
```

#### 6. 清理和重置

如果您需要因問題從頭開始：

```bash
# Windows
.\deploy.ps1 -Clean

# Linux/macOS
./deploy.sh --clean
```

---

## 📋 傳統部署方法

## 環境要求

| 元件 | 版本要求 | 描述 |
|-----------|---------------------|-------------|
| Node.js   | >= 16.0.0           | 運行環境 |
| MySQL     | >= 5.7               | 資料庫     |
| MariaDB   | >= 10.3             | 資料庫 (選擇性) |
| npm       | >= 8.0.0             | 軟體包管理器 |
| yarn      | >= 1.22.0            | 軟體包管理器 (選擇性) |
| Browser   | 支援 ES6+           | 現代瀏覽器 |

## 快速開始

### 1. 安裝依賴項

```bash
# 使用 cnpm
cnpm install
# 或使用 yarn
yarn install
```

### 2. 配置後端 API 地址

建立環境配置檔案 (選擇性)：

```bash
# 複製環境配置範本
cp .env.example .env
```

編輯 `.env` 檔案以配置後端 API 地址：

```env
# 後端 API 地址
VITE_API_BASE_URL=http://localhost:3001

# 其他配置...
```

### 3. 開啟開發伺服器

```bash
# 開啟開發伺服器
npm run dev

# 或使用 yarn
yarn dev

開發伺服器將在 `http://localhost:5173` 開啟。

### 4. 建立生產版本

```bash
# 建立生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 後端服務配置

⚠️ **重要提醒**：前端項目需要與後端服務一起使用。

1. **開啟後端服務**：
   ```bash
   # 將目標目錄切換至後端項目
   cd ../express-project
   
   # 安裝後端依賴項
   npm install
   
   # 開啟後端服務
   npm start
   ```

2. **後端服務地址**：`http://localhost:3001`

3. **API 文件**：請檢查後端項目中的 `API_DOCS.md` 文件。

## 開發環境配置

### 環境檢查

```bash
# 檢查 Node.js 版本
node --version

# 檢查 npm 版本
npm --version
```

### 開發伺服器

```bash
# 開啟開發伺服器 (熱重載)
npm run dev

# 存取地址：http://localhost:5173
```

### 程式碼規範

- 使用 Vue 3 Composition API
- 遵循 Vue.js 官方風格指南
- 成分命名使用 PascalCase
- 檔案命名使用短橫線分隔式

## 配置檔說明

### 前端配置檔 (在 vue3-project 目錄下)

| 檔案 | 說明 |
|------|------|
| `.env` | 環境變數配置檔 |
| `vite.config.js` | Vite 建置工具配置 |
| `package.json` | 專案依賴和腳本配置 |
| `jsconfig.json` | JavaScript 專案配置 |

### 後端配置檔 (在 express-project 目錄下)

| 檔案 | 說明 |
|------|------|
| `config/config.js` | 主要配置檔 |
| `.env` | 環境變數配置檔 |
| `database_design.md` | 資料庫設計文件 |
| `scripts/init-database.js` | 資料庫初始化腳本 |
| `generate-data.js` | 測試數據生成腳本 |

## npm 腳本命令

### 前端腳本 (在 vue3-project 目錄下執行)

| 腳本 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置生產版本 |
| `npm run preview` | 預覽生產版本 |

### 後端腳本 (在 express-project 目錄下執行)

| 腳本 | 說明 |
|------|------|
| `npm start` | 啟動伺服器 |
| `npm run dev` | 啟動開發伺服器 (熱重載) |
| `npm run init-db` | 初始化資料庫 |
| `npm run generate-data` | 生成測試數據 |

## 環境變數配置

### 前端環境變數 (在 vue3-project/.env)

```env
# API 伺服器位址
VITE_API_BASE_URL=http://localhost:3001/api

# 其他前端配置
VITE_APP_TITLE=Small Pear Graphic Community
VITE_USE_REAL_API=true
```

### 後端環境變數 (在 express-project/.env)

```env
# 伺服器配置
NODE_ENV=development
PORT=3001

# JWT 配置
JWT_SECRET=xiaoshiliu_secret_key_2025
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# 資料庫配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=xiaoshiliu
DB_PORT=3306

# API 配置
API_BASE_URL=http://localhost:3001

# 上傳配置
UPLOAD_MAX_SIZE=50mb
```

## 資料庫腳本說明

專案中相關的資料庫腳本都放在 `express-project/scripts/` 目錄下，以便於管理和使用：

### 腳本檔案介紹

#### 1. 資料庫初始化腳本
- **檔案位置**: `scripts/init-database.js`
- **功能**: 創建資料庫和所有表格結構
- **使用方法**:
  ```bash
  cd express-project
  node scripts/init-database.js
  ```
- **說明**: 必須在第一次部署時執行，將自動創建 `xiaoshiliu` 資料庫和 12 個資料表

#### 2. 測試數據生成腳本
- **檔案位置**: `scripts/generate-data.js`
- **功能**: 生成用戶、筆記、評論等模擬測試數據
- **使用方法**:
  ```bash
  cd express-project
  node scripts/generate-data.js

- **描述**：選擇性執行，用於快速填充測試數據，包括50個用戶、200筆記錄和800條評論等。

#### 3. SQL 初始化檔案
- **檔案位置**：`scripts/init-database.sql`
- **功能**：純SQL的數據庫初始化腳本
- **用法**：可直接在MySQL客戶端執行
- **描述**：功能與`init-database.js`相同，提供SQL版本的參考

#### 4. 示例圖片更新腳本
- **檔案位置**：`scripts/update-sample-images.js`
- **功能**：自動獲取最新圖片鏈接並更新數據庫中的示例圖片
- **用法**：
  ```bash
  cd express-project
  node scripts/update-sample-images.js
  ```
- **描述**：
  - 自動從LiCiYuan API獲取最新圖片鏈接
  - 更新`imgLinks/avatar_link.txt`（50個頭像鏈接）
  - 更新`imgLinks/post_img_link.txt`（300筆記錄圖片鏈接）
  - 批量更新用戶頭像和筆記圖片數據庫
  - 支持更新前後圖片數量的統計顯示

## 開發環境啟動流程

### 1. 啟動後端服務

```bash
# 打開第一個終端，進入後端目錄
cd express-project

# 安裝後端依賴（第一次運行）
npm install

# 配置數據庫（第一次運行）
# 编辑 config/config.js 或 .env 文件

# 初始化數據庫（第一次運行）
node scripts/init-database.js

# 生成測試數據（選擇性）
node scripts/generate-data.js

# 啟動後端服務
npm start
# 後端服務運行於 http://localhost:3001
```

### 2. 啟動前端服務

```bash
# 打開第二個終端，進入前端目錄
cd vue3-project

# 安裝前端依賴（第一次運行）
npm install

# 配置API地址（選擇性）
# 编辑 .env 文件，設置 VITE_API_BASE_URL

# 啟動前端開發服務器
npm run dev
# 前端服務運行於 http://localhost:5173
```

### 3. 访問應用程序

| 服務 | 地址 |
|------|------|
| 前端介面 | http://localhost:5173 |
| 後端API | http://localhost:3001 |