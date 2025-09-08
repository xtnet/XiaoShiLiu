<p align="center">
    <img alt="logo" src="../imgs/小石榴.png" width="100" />
</p>
<h1 align="center" style="margin: 20px 30px 0px 30px; font-weight: bold;">XiaoShiLiu</h1>

---
<p align="center">
    <b>基於 Express + Vue 前後端分離仿小紅書項目</b>
</p>
<p align="center">
    <i>一個高仿小紅書的圖文社群項目，支援圖文發布、社交互動等核心功能，旨在提供從前端到後端的完整實踐範本</i>
<p align="center"><a href="https://www.shiliu.space">演示網站</a> · <a href="https://www.bilibili.com/video/BV1J4agztEBX/?spm_id_from=333.1387.homepage.video_card.click">影片介紹</a>
</p>
<p align="center"><a href="https://github.com/ZTMYO/XiaoShiLiu">簡體中文</a>|<a href="README_En.md">English</a>|<a href="./i18n/README_zh-Hant.md">繁體中文</a>
</p>
<p align="center">
    <a href="https://github.com/ZTMYO/XiaoShiLiu/stargazers">
        <img src="https://img.shields.io/github/stars/ZTMYO/XiaoShiLiu?style=flat&logo=github&color=brightgreen&label=Stars">
    </a>
    <a href="https://github.com/ZTMYO/XiaoShiLiu/network/members">
        <img src="https://img.shields.io/github/forks/ZTMYO/XiaoShiLiu?style=round-square&color=brightgreen&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KPHBhdGggZmlsbD0id2hpdGUiIGQ9Ik01IDUuMzcydi44NzhjMCAuNDE0LjMzNi43NS43NS43NWg0LjVhLjc1Ljc1IDAgMCAwIC43NS0uNzV2LS44NzhhMi4yNSAyLjI1IDAgMSAxIDEuNSAwdi44NzhhMi4yNSAyLjI1IDAgMCAxLTIuMjUgMi4yNWgtMS41djIuMTI4YTIuMjUxIDIuMjUxIDAgMSAxLTEuNSAwVjguNWgtMS41QTIuMjUgMi4yNSAwIDAgMSAzLjUgNi4yNXYtLjg3OGEyLjI1IDIuMjUgMCAxIDEgMS41IDBaTTUgMy4yNWEuNzUuNzUgMCAxIDAtMS41IDAgLjc1Ljc1IDAgMCAwIDEuNSAwWm02Ljc1Ljc1YS43NS43NSAwIDEgMCAwLTEuNS43NS43NSAwIDAgMCAwIDEuNVptLTMgOC43NWEuNzUuNzUgMCAxIDAtMS41IDAgLjc1Ljc1IDAgMCAwIDEuNSAwWiI+PC9wYXRoPgo8L3N2Zz4=">
    </a>
    <a href="https://github.com/ZTMYO/XiaoShiLiu">
        <img
            src="https://img.shields.io/badge/XiaoShiLiu-v1.1.0-brightgreen.svg?logo=data:image/png;base64,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">
    </a>
    <a href="https://github.com/ZTMYO/XiaoShiLiu/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/ZTMYO/XiaoShiLiu?color=8ebc06">
    </a>
</p>
<p align="center">
    <img src="https://img.shields.io/static/v1?message=Vue&color=4f4f4f&logo=Vue.js&logoColor=4FC08D&label=">
    <img
        src="https://img.shields.io/static/v1?&message=JavaScript&color=4f4f4f&logo=JavaScript&logoColor=F7DF1E&label=">
    </a>
</p>


> **聲明**  
> 本項目基於 [GPLv3 協議](./LICENSE)，免費開源，僅供學習交流，禁止轉賣，謹防受騙。如需商用請保留版權信息，確保合法合規使用，運營風險自負，與作者無關。

---

> 📁 **項目結構說明**：本項目包含完整的前後端程式碼，前端位於 `vue3-project/` 目錄，後端位於 `express-project/` 目錄。詳細結構請查看 [項目結構文件](PROJECT_STRUCTURE_zh-Hant.md)。

## 項目展示

### PC端界面

<table>
  <tr>
    <td><img src="../imgs/1.png" alt="PC端界面1" width="300"/></td>
<td><img src="../imgs/2.png" alt="PC端界面2" width="300"/></td>
<td><img src="../imgs/3.png" alt="PC端界面3" width="300"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/4.png" alt="PC端界面4" width="300"/></td>
<td><img src="../imgs/5.png" alt="PC端界面5" width="300"/></td>
<td><img src="../imgs/6.png" alt="PC端界面6" width="300"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/7.png" alt="PC端界面7" width="300"/></td>
<td><img src="../imgs/8.png" alt="PC端界面8" width="300"/></td>
<td><img src="../imgs/9.png" alt="PC端界面9" width="300"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/10.png" alt="PC端界面10" width="300"/></td>
<td><img src="../imgs/11.png" alt="PC端界面11" width="300"/></td>
<td><img src="../imgs/12.png" alt="PC端界面12" width="300"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/13.png" alt="PC端界面13" width="300"/></td>
<td><img src="../imgs/14.png" alt="PC端界面14" width="300"/></td>
<td><img src="../imgs/15.png" alt="PC端界面15" width="300"/></td>
  </tr>
</table>



### 移動端界面

<table>
  <tr>
    <td><img src="../imgs/m1.png" alt="移動端界面1" width="200"/></td>
<td><img src="../imgs/m2.png" alt="移動端界面2" width="200"/></td>
<td><img src="../imgs/m3.png" alt="移動端界面3" width="200"/></td>
<td><img src="../imgs/m4.png" alt="移動端界面4" width="200"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/m5.png" alt="移動端界面5" width="200"/></td>
<td><img src="../imgs/m6.png" alt="移動端界面6" width="200"/></td>
<td><img src="../imgs/m7.png" alt="移動端界面7" width="200"/></td>
<td><img src="../imgs/m8.png" alt="移動端界面8" width="200"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/m9.png" alt="移動端界面9" width="200"/></td>
<td><img src="../imgs/m10.png" alt="移動端界面10" width="200"/></td>
<td><img src="../imgs/m11.png" alt="移動端界面11" width="200"/></td>
<td><img src="../imgs/m12.png" alt="移動端界面12" width="200"/></td>
  </tr>
</table>

## 項目文件

| 文件 | 說明 |
|------|------|
| [部署指南](DEPLOYMENT_zh-Hant.md) | 部署配置和環境搭建說明 |
| [項目結構](PROJECT_STRUCTURE_zh-Hant.md) | 項目目錄結構架構說明 |
| [資料庫設計](DATABASE_DESIGN_zh-Hant.md) | 資料庫表結構設計文件 |
| [API接口文件](API_DOCS_zh-Hant.md) | 後端API接口說明和示例 |

## 項目亮點

- **工程化：** 環境配置、程式碼規範、建構與產物最佳化的完整流程
- **業務能力：** 驗權流程、路由守衛、狀態管理與接口封裝
- **體驗優化：** 骨架屏、延遲載入、預載入、無障礙與響應式適配
- **元件與分層：** 可復用元件拆分、按領域分組與別名引入
- **後台管理：** 基礎CRUD、數據管理與配置面板，支援後續擴展權限與統計
- **快速部署：** 基於 Docker 的一鍵部署方案，支援多環境配置與自動化部署

## 技術棧

> 💡點擊可展開查看詳細內容
<details>
<summary><b>前端技術</b></summary>

- **Vue.js 3** - 前端框架（Composition API）
- **Vue Router 4** - 路由管理
- **Pinia** - 狀態管理
- **Vite** - 建構工具和開發伺服器
- **Axios** - HTTP用戶端
- **VueUse** - Vue組合式工具庫
- **CropperJS** - 圖片裁剪
- **Vue3 Emoji Picker** - 表情選擇器
- **svg-captcha** - 驗證碼產生器
</details>

<details>
<summary><b>後端技術</b></summary>

- **Node.js** - 執行環境
- **Express.js** - Web框架
- **MySQL** - 資料庫
- **JWT** - 身份驗證
- **Multer** - 文件上傳
- **bcrypt** - 密碼加密
- **CORS** - 跨域資源共享

</details>



## 第三方API
- **圖片儲存：** 灌裝的示例圖片來自 [栗次元圖床](https://t.alcy.cc/)，提供穩定的圖片儲存服務
- **圖片上傳：** 使用者上傳圖片使用了 [夏柔API](https://api.aa1.cn/doc/xinyew_jdtc.html)，確保圖片上傳的穩定性和速度
- **属地查詢：** IP属地查詢服務使用 [保羅API](https://api.pearktrue.cn/dashboard/detail/290)，實現精準的IP属地定位功能


## 環境要求

| 元件 | 版本要求 |
|------|----------|
| Node.js | >= 16.0.0 |
| MySQL | >= 5.7 |
| MariaDB | >= 10.3 |
| npm | >= 8.0.0 |
| yarn | >= 1.22.0 |
| 瀏覽器 | 支援ES6+ |

> 提示：上述為傳統本地開發的最低版本要求。若使用 Docker 部署，預設鏡像版本如下：MySQL 8.0、Node 18-alpine（前後端建構/執行）、Nginx alpine；Docker >= 20、Docker Compose >= 2。詳見[部署指南文件](DEPLOYMENT_zh-Hant.md)。

### 1. 安裝依賴

```bash
# 使用 cnpm或npm
cnpm install
# 或使用 yarn
yarn install
```

### 2. 啟動開發伺服器

```bash
# 啟動開發伺服器
npm run dev

# 或使用 yarn
yarn dev
```

開發伺服器將在 `http://localhost:5173` 啟動

### 3. 建構生產版本

```bash
# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

> ⚠️ **重要提醒**：前端項目需配合後端服務使用，詳細配置請查看 [部署指南](DEPLOYMENT_zh-Hant.md)

## Star歷史

[![Star History Chart](https://api.star-history.com/svg?repos=ZTMYO/XiaoShiLiu&type=Date)](https://www.star-history.com/#ZTMYO/XiaoShiLiu&Date)

---

<div align="center">

Copyright © 2025 - **XiaoShiLiu**\
By ZTMYO\
Made with ❤️ & ⌨️

</div>
