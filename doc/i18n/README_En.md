<p align="center">
    <img alt="logo" src="../imgs/小石榴.png" width="100" />
</p>
<h1 align="center" style="margin: 20px 30px 0px 30px; font-weight: bold;">XiaoShiLiu</h1>

---
<p align="center">
    <b>Express + Vue Separation of Frontend and Backend Xiaohongshu Clone Project</b>
</p>
<p align="center">
    <i>A high-fidelity Xiaohongshu-style graphic community project supporting core features like graphic posting and social interaction, designed to provide a complete frontend-to-backend practice template</i>
<p align="center"><a href="https://www.shiliu.space">Demo Site</a> · <a href="https://www.bilibili.com/video/BV1J4agztEBX/?spm_id_from=333.1387.homepage.video_card.click">Video Introduction</a>
</p>
<p align="center"><a href="https://github.com/ZTMYO/XiaoShiLiu">简体中文</a>|<a href="README_En.md">English</a>|<a href="README_zh-Hant.md">繁體中文</a>

<p align="center">
    <a href="https://github.com/ZTMYO/XiaoShiLiu/stargazers">
        <img src="https://img.shields.io/github/stars/ZTMYO/XiaoShiLiu?style=flat&logo=github&color=brightgreen&label=Stars">
    </a>
    <a href="https://github.com/ZTMYO/XiaoShiLiu/network/members">
        <img src="https://img.shields.io/github/forks/ZTMYO/XiaoShiLiu?style=round-square&color=brightgreen&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KPHBhdGggZmlsbD0id2hpdGUiIGQ9Ik01IDUuMzcydi44NzhjMCAuNDE0LjMzNi43NS43NS43NWg0LjVhLjc1Ljc1IDAgMCAwIC43NS0uNzV2LS44NzhhMi4yNSAyLjI1IDAgMSAxIDEuNSAwdi44NzhhMi4yNSAyLjI1IDAgMCAxLTIuMjUgMi4yNWgtMS41djIuMTI4YTIuMjUxIDIuMjUxIDAgMSAxLTEuNSAwVjguNWgtMS41QTIuMjUgMi4yNSAwIDAgMSAzLjUgNi4yNXYtLjg3OGEyLjI1IDIuMjUgMCAxIDEgMS41IDBaTTUgMy4yNWEuNzUuNzUgMCAxIDAtMS41IDAgLjc1Ljc1IDAgMCAwIDEuNSAwWm02Ljc1Ljc1YS43NS43NSAwIDEgMCAwLTEuNS43NS43NSAwIDAgMCAwIDEuNVptLTMgOC43NWEuNzUuNzUgMCAxIDAtMS41IDAgLjc1Ljc1IDAgMCAwIDEuNSAwWiI+PC9wYXRoPgo8L3N2Zz4=">
    </a>
    <a href="https://github.com/ZTMYO/XiaoShiLiu">
        <img src="https://img.shields.io/badge/XiaoShiLiu-v1.1.4-brightgreen.svg?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij4KPHBhdGggZD0iTTAgMCBDOC4yMzM5MjM3MyA0LjgwNTUxMjk4IDEzLjM5NDExMDk0IDExLjExOTkwODc5IDE2LjI0MjE4NzUgMjAuMzA4NTkzNzUgQzE3LjYxMzc5Mjg2IDI4Ljg5NzE1MDcxIDE3LjI0OTA1Nzc5IDM3Ljk1MjQ1ODgxIDEyLjI0MjE4NzUgNDUuMzA4NTkzNzUgQzguNTU3NjIxNjkgNTAuMjc3ODUwNzkgNC42OTM0Mzk2OCA1NC4zMzUxODM0NyAtMC43NTc4MTI1IDU3LjMwODU5Mzc1IEMtMS43NDc4MTI1IDU3LjMwODU5Mzc1IC0yLjczNzgxMjUgNTcuMzA4NTkzNzUgLTMuNzU3ODEyNSA1Ny4zMDg1OTM3NSBDLTMuNzU3ODEyNSA1Ni42NDg1OTM3NSAtMy43NTc4MTI1IDU1Ljk4ODU5Mzc1IC0zLjc1NzgxMjUgNTUuMzA4NTkzNzUgQy00Ljc0NzgxMjUgNTUuMzA4NTkzNzUgLTUuNzM3ODEyNSA1NS4zMDg1OTM3NSAtNi43NTc4MTI1IDU1LjMwODU5Mzc1IEMtNi41MDc4MTI1IDUyLjkzMzU5Mzc1IC02LjUwNzgxMjUgNTIuOTMzNTkzNzUgLTUuNzU3ODEyNSA1MC4zMDg1OTM3NSBDLTUuMTE4NDM3NSA1MC4wMTk4NDM3NSAtNC40NzkwNjI1IDQ5LjczMTA5Mzc1IC0zLjgyMDMxMjUgNDkuNDMzNTkzNzUgQy0zLjEzOTY4NzUgNDkuMDYyMzQzNzUgLTIuNDU5MDYyNSA0OC42OTEwOTM3NSAtMS43NTc4MTI1IDQ4LjMwODU5Mzc1IEMtMS40Mjc4MTI1IDQ3LjE1MzU5Mzc1IC0xLjA5NzgxMjUgNDUuOTk4NTkzNzUgLTAuNzU3ODEyNSA0NC44MDg1OTM3NSBDMC4yNDIxODc1IDQxLjMwODU5Mzc1IDAuMjQyMTg3NSA0MS4zMDg1OTM3NSAyLjM2NzE4NzUgMzkuODcxMDkzNzUgQzIuOTg1OTM3NSAzOS42ODU0Njg3NSAzLjYwNDY4NzUgMzkuNDk5ODQzNzUgNC4yNDIxODc1IDM5LjMwODU5Mzc1IEM0LjY5NTkzNzUgMzkuOTY4NTkzNzUgNS4xNDk2ODc1IDQwLjYyODU5Mzc1IDUuNjE3MTg3NSA0MS4zMDg1OTM3NSBDNi4xNTM0Mzc1IDQxLjk2ODU5Mzc1IDYuNjg5Njg3NSA0Mi42Mjg1OTM3NSA3LjI0MjE4NzUgNDMuMzA4NTkzNzUgQzcuOTAyMTg3NSA0My4zMDg1OTM3NSA4LjU2MjE4NzUgNDMuMzA4NTkzNzUgOS4yNDIxODc1IDQzLjMwODU5Mzc1IEM4LjkzMjgxMjUgNDIuNzEwNDY4NzUgOC42MjM0Mzc1IDQyLjExMjM0Mzc1IDguMzA0Njg3NSA0MS40OTYwOTM3NSBDNy4yNDIxODc1IDM5LjMwODU5Mzc1IDcuMjQyMTg3NSAzOS4zMDg1OTM3NSA2LjI0MjE4NzUgMzYuMzA4NTkzNzUgQzUuNTgyMTg3NSAzNi4zMDg1OTM3NSA0LjkyMjE4NzUgMzYuMzA4NTkzNzUgNC4yNDIxODc1IDM2LjMwODU5Mzc1IEM0LjE2NzQyMTg4IDM1LjUyMzU1NDY5IDQuMDkyNjU2MjUgMzQuNzM4NTE1NjIgNC4wMTU2MjUgMzMuOTI5Njg3NSBDMy4xMjk5Mzc1OCAyNi44NTI4NzEzOCAxLjk3NjEyNDg3IDIxLjg2NDkwMDk1IC0zLjc1NzgxMjUgMTcuMzA4NTkzNzUgQy02LjQ0MjYxMTI2IDE1Ljg0NDMzODQyIC02LjQ0MjYxMTI2IDE1Ljg0NDMzODQyIC04Ljc1NzgxMjUgMTUuMzA4NTkzNzUgQy04Ljc1NzgxMjUgMTMuMzA4NTkzNzUgLTguNzU3ODEyNSAxMS4zMDg1OTM3NSAtOC43NTc4MTI1IDkuMzA4NTkzNzUgQy0xMC4wNzc4MTI1IDkuNjM4NTkzNzUgLTExLjM5NzgxMjUgOS45Njg1OTM3NSAtMTIuNzU3ODEyNSAxMC4zMDg1OTM3NSBDLTEzLjI1MjgxMjUgOS4zMTg1OTM3NSAtMTMuMjUyODEyNSA5LjMxODU5Mzc1IC0xMy43NTc4MTI1IDguMzA4NTkzNzUgQy0xNC43NDc4MTI1IDguOTY4NTkzNzUgLTE1LjczNzgxMjUgOS42Mjg1OTM3NSAtMTYuNzU3ODEyNSAxMC4zMDg1OTM3NSBDLTE3LjQxNzgxMjUgOS45Nzg1OTM3NSAtMTguMDc3ODEyNSA5LjY0ODU5Mzc1IC0xOC43NTc4MTI1IDkuMzA4NTkzNzUgQy0xOC43NTc4MTI1IDEwLjI5ODU5Mzc1IC0xOC43NTc4MTI1IDExLjI4ODU5Mzc1IC0xOC43NTc4MTI1IDEyLjMwODU5Mzc1IEMtMTkuNzQ3ODEyNSAxMi44MDM1OTM3NSAtMTkuNzQ3ODEyNSAxMi44MDM1OTM3NSAtMjAuNzU3ODEyNSAxMy4zMDg1OTM3NSBDLTIwLjc1NzgxMjUgMTMuOTY4NTkzNzUgLTIwLjc1NzgxMjUgMTQuNjI4NTkzNzUgLTIwLjc1NzgxMjUgMTUuMzA4NTkzNzUgQy0yMS44MzAzMTI1IDE1Ljg0NDg0Mzc1IC0yMi45MDI4MTI1IDE2LjM4MTA5Mzc1IC0yNC4wMDc4MTI1IDE2LjkzMzU5Mzc1IEMtMjcuODEwMzgyOTQgMTkuMTQyNzc5NDEgLTI5Ljc4Njc2NzkgMjEuMjkwNjk1MTQgLTMxLjc1NzgxMjUgMjUuMzA4NTkzNzUgQy0zMS45MzAzOTUyNiAyNi43NjIwNjQxOCAtMzIuMDUyMzE4NjkgMjguMjIyMTI4MSAtMzIuMTMyODEyNSAyOS42ODM1OTM3NSBDLTMyLjQzNDQyODU0IDM0LjUwMTI5ODY1IC0zNC4zOTE4NDAyNiAzNy4wODIzNDM3MyAtMzcuNDgwNDY4NzUgNDAuNjc5Njg3NSBDLTM4Ljk2MzUwMjkgNDIuMjI1ODk0NDcgLTM4Ljk2MzUwMjkgNDIuMjI1ODk0NDcgLTM4Ljc1NzgxMjUgNDQuMzA4NTkzNzUgQy0zNy45OTQ2ODc1IDQzLjQ4MzU5Mzc1IC0zNy4yMzE1NjI1IDQyLjY1ODU5Mzc1IC0zNi40NDUzMTI1IDQxLjgwODU5Mzc1IEMtMzMuNzU3ODEyNSAzOS4zMDg1OTM3NSAtMzMuNzU3ODEyNSAzOS4zMDg1OTM3NSAtMzAuNzU3ODEyNSAzOS4zMDg1OTM3NSBDLTI3Ljc1NzgxMjUgNDUuOTMzNTkzNzUgLTI3Ljc1NzgxMjUgNDUuOTMzNTkzNzUgLTI3Ljc1NzgxMjUgNDkuMzA4NTkzNzUgQy0yNi4xMDc4MTI1IDQ5LjYzODU5Mzc1IC0yNC40NTc4MTI1IDQ5Ljk2ODU5Mzc1IC0yMi43NTc4MTI1IDUwLjMwODU5Mzc1IEMtMjIuNzU3ODEyNSA1MS45NTg1OTM3NSAtMjIuNzU3ODEyNSA1My42MDg1OTM3NSAtMjIuNzU3ODEyNSA1NS4zMDg1OTM3NSBDLTIzLjc0NzgxMjUgNTUuMzA4NTkzNzUgLTI0LjczNzgxMjUgNTUuMzA4NTkzNzUgLTI1Ljc1NzgxMjUgNTUuMzA4NTkzNzUgQy0yNS43NTc4MTI1IDU1Ljk2ODU5Mzc1IC0yNS43NTc4MTI1IDU2LjYyODU5Mzc1IC0yNS43NTc4MTI1IDU3LjMwODU5Mzc1IEMtMzIuNTI2NTA0NzMgNTUuNzg1NjM4IC0zNy40NzcyNzI2MSA1MS42NDUxNDcxOCAtNDEuMzQzNzUgNDUuOTg4MjgxMjUgQy00Ni4yNzAzNTg4NiAzNy4zNTk1OTYzNyAtNDcuMzg5NTU4NzQgMjguMjE3ODczNTMgLTQ1LjA3NDIxODc1IDE4LjQxNDA2MjUgQy00MS43OTkzODk4NCA5LjU2Nzk0Nzg4IC0zNi4yMTkzMDM3NCAzLjQ2MTU2ODMxIC0yNy43NTc4MTI1IC0wLjY5MTQwNjI1IEMtMTguODY1NTI1NzkgLTQuMTkxODIyOTggLTguNjc3NzczMTUgLTQuMTExMjcyODUgMCAwIFogIiBmaWxsPSIjRkNGQ0ZDIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0Ni43NTc4MTI1LDMuNjkxNDA2MjUpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuOTkgMCAxLjk4IDAgMyAwIEMzIDAuNjYgMyAxLjMyIDMgMiBDMy45OSAyIDQuOTggMiA2IDIgQzYgMy45OCA2IDUuOTYgNiA4IEM3LjMyIDguMzMgOC42NCA4LjY2IDEwIDkgQzkgMTAgOSAxMCA1LjQwMjM0Mzc1IDEwLjA5NzY1NjI1IEMzLjkxNDAzMTMzIDEwLjA5MDk4MjIgMi40MjU3MzU2OCAxMC4wNzkwMjE4MyAwLjkzNzUgMTAuMDYyNSBDLTAuMjAwNDE5OTIgMTAuMDU1NzMyNDIgLTAuMjAwNDE5OTIgMTAuMDU1NzMyNDIgLTEuMzYxMzI4MTIgMTAuMDQ4ODI4MTIgQy0zLjI0MDkxODcxIDEwLjAzNzAwNjggLTUuMTIwNDY4OTkgMTAuMDE5MDcwNzggLTcgMTAgQy03LjMzIDkuMzQgLTcuNjYgOC42OCAtOCA4IEMtNi42OCA4IC01LjM2IDggLTQgOCBDLTQgNi4wMiAtNCA0LjA0IC00IDIgQy0yLjY4IDIgLTEuMzYgMiAwIDIgQzAgMS4zNCAwIDAuNjggMCAwIFogIiBmaWxsPSIjRjFGMUYxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMSw1MykiLz4KPC9zdmc+Cg==">
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


> **Disclaimer**  
> This project is licensed under the [GPLv3 License](./LICENSE), free and open-source, for learning and communication purposes only. Resale is prohibited; please beware of scams. For commercial use, retain copyright information to ensure legal compliance. Operational risks shall be borne by the user, and the author is not liable.

---

> 📁 **Project Structure Explanation**: This project contains complete frontend and backend code. The frontend is located in the `vue3-project/` directory, and the backend is in the `express-project/` directory. For detailed structure, please refer to the [Project Structure Document](PROJECT_STRUCTURE_En.md).

## Project Demonstration

### PC Interface

<table>
  <tr>
    <td><img src="../imgs/1.png" alt="PC Interface 1" width="300"/></td>
    <td><img src="../imgs/2.png" alt="PC Interface 2" width="300"/></td>
    <td><img src="../imgs/3.png" alt="PC Interface 3" width="300"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/4.png" alt="PC Interface 4" width="300"/></td>
    <td><img src="../imgs/5.png" alt="PC Interface 5" width="300"/></td>
    <td><img src="../imgs/6.png" alt="PC Interface 6" width="300"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/7.png" alt="PC Interface 7" width="300"/></td>
    <td><img src="../imgs/8.png" alt="PC Interface 8" width="300"/></td>
    <td><img src="../imgs/9.png" alt="PC Interface 9" width="300"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/10.png" alt="PC Interface 10" width="300"/></td>
    <td><img src="../imgs/11.png" alt="PC Interface 11" width="300"/></td>
    <td><img src="../imgs/12.png" alt="PC Interface 12" width="300"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/13.png" alt="PC Interface 13" width="300"/></td>
    <td><img src="../imgs/14.png" alt="PC Interface 14" width="300"/></td>
    <td><img src="../imgs/15.png" alt="PC Interface 15" width="300"/></td>
  </tr>
</table>



### Mobile Interface

<table>
  <tr>
    <td><img src="../imgs/m1.png" alt="Mobile Interface 1" width="200"/></td>
    <td><img src="../imgs/m2.png" alt="Mobile Interface 2" width="200"/></td>
    <td><img src="../imgs/m3.png" alt="Mobile Interface 3" width="200"/></td>
    <td><img src="../imgs/m4.png" alt="Mobile Interface 4" width="200"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/m5.png" alt="Mobile Interface 5" width="200"/></td>
    <td><img src="../imgs/m6.png" alt="Mobile Interface 6" width="200"/></td>
    <td><img src="../imgs/m7.png" alt="Mobile Interface 7" width="200"/></td>
    <td><img src="../imgs/m8.png" alt="Mobile Interface 8" width="200"/></td>
  </tr>
  <tr>
    <td><img src="../imgs/m9.png" alt="Mobile Interface 9" width="200"/></td>
    <td><img src="../imgs/m10.png" alt="Mobile Interface 10" width="200"/></td>
    <td><img src="../imgs/m11.png" alt="Mobile Interface 11" width="200"/></td>
    <td><img src="../imgs/m12.png" alt="Mobile Interface 12" width="200"/></td>
  </tr>
</table>

## Project Documents

| Document | Description |
|----------|-------------|
| [Deployment Guide](DEPLOYMENT_En.md) | Deployment configuration and environment setup instructions |
| [Project Structure](PROJECT_STRUCTURE_En.md) | Project directory structure and architecture explanation |
| [Database Design](DATABASE_DESIGN_En.md) | Database table structure design document |
| [API Docs](API_DOCS_En.md) | Backend API interface description and examples |

## Project Highlights

- **Engineering Practice**: Complete workflow of environment configuration, code standards, building, and product optimization
- **Business Capabilities**: Authentication flow, route guards, state management, and interface encapsulation
- **Experience Optimization**: Skeleton screens, lazy loading, preloading, accessibility, and responsive adaptation
- **Component & Layering**: Reusable component splitting, domain-based grouping, and alias introduction
- **Backend Management**: Basic CRUD, data management, configuration panel, supporting subsequent permission and statistics expansion
- **Quick Deployment**: Docker-based one-click deployment solution, supporting multi-environment configuration and automated deployment

## Technology Stack

> 💡 Click to expand for details
<details>
<summary><b>Frontend Technology</b></summary>

- **Vue.js 3** - Frontend framework (Composition API)
- **Vue Router 4** - Routing management
- **Pinia** - State management
- **Vite** - Build tool and development server
- **Axios** - HTTP client
- **VueUse** - Vue composable utility library
- **CropperJS** - Image cropping tool
- **Vue3 Emoji Picker** - Emoji selector
- **svg-captcha** - CAPTCHA generator
</details>

<details>
<summary><b>Backend Technology</b></summary>

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Identity authentication
- **Multer** - File upload handling
- **bcrypt** - Password encryption
- **CORS** - Cross-origin resource sharing

</details>



## Third-Party APIs
- **Image Storage**: Sample images are from [Liciyuan Image Hosting](https://t.alcy.cc/), providing stable image storage service
- **Image Upload**: User-uploaded images use [Xiarou API](https://api.aa1.cn/doc/xinyew_jdtc.html) to ensure stability and speed
- **IP Location Query**: IP location service uses [Baoluo API](https://api.pearktrue.cn/dashboard/detail/290) for accurate IP positioning

## Environment Requirements

| Component | Version Requirement |
|-----------|---------------------|
| Node.js | >= 16.0.0 |
| MySQL | >= 5.7 |
| MariaDB | >= 10.3 |
| npm | >= 8.0.0 |
| yarn | >= 1.22.0 |
| Browser | ES6+ supported |

> Note: The above are the minimum version requirements for traditional local development. For Docker deployment, the default image versions are as follows: MySQL 8.0, Node 18-alpine (frontend/backend build/run), Nginx alpine; Docker >= 20, Docker Compose >= 2. See [Deployment Guide](DEPLOYMENT_En.md) for details.

## Environment Configuration

The project uses environment variables for configuration management, with separate `.env` files for frontend and backend:

### Backend Configuration (express-project/.env)

```env
# Server configuration
PORT=3001
NODE_ENV=development

# Database configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=xiaoshiliu
DB_PORT=3306

# JWT configuration
JWT_SECRET=xiaoshiliu_secret_key_2025
JWT_EXPIRES_IN=7d

# Upload configuration
UPLOAD_MAX_SIZE=50mb
# Image upload strategy (local: local storage, imagehost: third-party image hosting)
UPLOAD_STRATEGY=imagehost

# Local storage configuration
LOCAL_UPLOAD_DIR=uploads
LOCAL_BASE_URL=http://localhost:3001

# Third-party image hosting configuration
IMAGEHOST_API_URL=https://api.xinyew.cn/api/jdtc
IMAGEHOST_TIMEOUT=60000
```

### Frontend Configuration (vue3-project/.env)

```env
# API base URL configuration
VITE_API_BASE_URL=http://localhost:3001/api

# Application configuration
VITE_USE_REAL_API=true
VITE_APP_TITLE=XiaoShiLiu Image-Text Community
```

> 💡 **Configuration Notes**:
> - Backend supports both local storage and third-party image hosting upload strategies
> - Frontend uses Vite environment variables, variable names must start with `VITE_`
> - For detailed configuration instructions, please refer to the [Deployment Guide](DEPLOYMENT_En.md)

### 1. Install Dependencies

```bash
# Using cnpm or npm
cnpm install
# Or using yarn
yarn install
```

### 2. Start Development Server

```bash
# Start development server
npm run dev

# Or using yarn
yarn dev
```

The development server will start at `http://localhost:5173`

### 3. Build Production Version

```bash
# Build production version
npm run build

# Preview production version
npm run preview
```

> ⚠️ **Important Reminder**: The frontend project needs to work with the backend service. For detailed configuration, please refer to the [Deployment Guide](DEPLOYMENT_En.md)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ZTMYO/XiaoShiLiu&type=Date)](https://www.star-history.com/#ZTMYO/XiaoShiLiu&Date)

---

<div align="center">

Copyright © 2025 - **XiaoShiLiu**\
By ZTMYO\
Made with ❤️ & ⌨️

</div>
