<p align="center">
    <img alt="logo" src="./doc/imgs/小石榴.png" width="100" />
</p>
<h1 align="center" style="margin: 20px 30px 0px 30px; font-weight: bold;">XiaoShiLiu</h1>

---
<p align="center">
    <b>基于 Express + Vue 前后端分离仿小红书项目</b>
</p>
<p align="center">
    <i>一个高仿小红书的图文社区项目，支持图文发布、社交互动等核心功能，旨在提供从前端到后端的完整实践范本</i>
<p align="center"><a href="https://www.shiliu.space">演示网站</a> · <a href="https://www.bilibili.com/video/BV1J4agztEBX/?spm_id_from=333.1387.homepage.video_card.click">视频介绍</a>
</p>
<p align="center"><a href="https://github.com/ZTMYO/XiaoShiLiu">简体中文</a>|<a href="doc/i18n/README_En.md">English</a>|<a href="doc/i18n/README_zh-Hant.md">繁體中文</a>

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


> **声明**  
> 本项目基于 [GPLv3 协议](./LICENSE)，免费开源，仅供学习交流，禁止转卖，谨防受骗。如需商用请保留版权信息，确保合法合规使用，运营风险自负，与作者无关。

---

> 📁 **项目结构说明**：本项目包含完整的前后端代码，前端位于 `vue3-project/` 目录，后端位于 `express-project/` 目录。详细结构请查看 [项目结构文档](./doc/PROJECT_STRUCTURE.md)。

## 项目展示

### PC端界面

<table>
  <tr>
    <td><img src="./doc/imgs/1.png" alt="PC端界面1" width="300"/></td>
    <td><img src="./doc/imgs/2.png" alt="PC端界面2" width="300"/></td>
    <td><img src="./doc/imgs/3.png" alt="PC端界面3" width="300"/></td>
  </tr>
  <tr>
    <td><img src="./doc/imgs/4.png" alt="PC端界面4" width="300"/></td>
    <td><img src="./doc/imgs/5.png" alt="PC端界面5" width="300"/></td>
    <td><img src="./doc/imgs/6.png" alt="PC端界面6" width="300"/></td>
  </tr>
  <tr>
    <td><img src="./doc/imgs/7.png" alt="PC端界面7" width="300"/></td>
    <td><img src="./doc/imgs/8.png" alt="PC端界面8" width="300"/></td>
    <td><img src="./doc/imgs/9.png" alt="PC端界面9" width="300"/></td>
  </tr>
  <tr>
    <td><img src="./doc/imgs/10.png" alt="PC端界面10" width="300"/></td>
    <td><img src="./doc/imgs/11.png" alt="PC端界面11" width="300"/></td>
    <td><img src="./doc/imgs/12.png" alt="PC端界面12" width="300"/></td>
  </tr>
  <tr>
    <td><img src="./doc/imgs/13.png" alt="PC端界面13" width="300"/></td>
    <td><img src="./doc/imgs/14.png" alt="PC端界面14" width="300"/></td>
    <td><img src="./doc/imgs/15.png" alt="PC端界面15" width="300"/></td>
  </tr>
</table>



### 移动端界面

<table>
  <tr>
    <td><img src="./doc/imgs/m1.png" alt="移动端界面1" width="200"/></td>
    <td><img src="./doc/imgs/m2.png" alt="移动端界面2" width="200"/></td>
    <td><img src="./doc/imgs/m3.png" alt="移动端界面3" width="200"/></td>
    <td><img src="./doc/imgs/m4.png" alt="移动端界面4" width="200"/></td>
  </tr>
  <tr>
    <td><img src="./doc/imgs/m5.png" alt="移动端界面5" width="200"/></td>
    <td><img src="./doc/imgs/m6.png" alt="移动端界面6" width="200"/></td>
    <td><img src="./doc/imgs/m7.png" alt="移动端界面7" width="200"/></td>
    <td><img src="./doc/imgs/m8.png" alt="移动端界面8" width="200"/></td>
  </tr>
  <tr>
    <td><img src="./doc/imgs/m9.png" alt="移动端界面9" width="200"/></td>
    <td><img src="./doc/imgs/m10.png" alt="移动端界面10" width="200"/></td>
    <td><img src="./doc/imgs/m11.png" alt="移动端界面11" width="200"/></td>
    <td><img src="./doc/imgs/m12.png" alt="移动端界面12" width="200"/></td>
  </tr>
</table>

## 项目文档

| 文档 | 说明 |
|------|------|
| [部署指南](./doc/DEPLOYMENT.md) | 部署配置和环境搭建说明 |
| [项目结构](./doc/PROJECT_STRUCTURE.md) | 项目目录结构架构说明 |
| [数据库设计](./doc/DATABASE_DESIGN.md) | 数据库表结构设计文档 |
| [API接口文档](./doc/API_DOCS.md) | 后端API接口说明和示例 |

## 项目亮点

- **工程化：** 环境配置、代码规范、构建与产物优化的完整流程
- **业务能力：** 鉴权流程、路由守卫、状态管理与接口封装
- **体验优化：** 骨架屏、懒加载、预加载、无障碍与响应式适配
- **组件与分层：** 可复用组件拆分、按领域分组与别名引入
- **后台管理：** 基础CRUD、数据管理与配置面板，支持后续扩展权限与统计
- **快速部署：** 基于 Docker 的一键部署方案，支持多环境配置与自动化部署

## 技术栈

> 💡点击可展开查看详细内容
<details>
<summary><b>前端技术</b></summary>

- **Vue.js 3** - 前端框架（Composition API）
- **Vue Router 4** - 路由管理
- **Pinia** - 状态管理
- **Vite** - 构建工具和开发服务器
- **Axios** - HTTP客户端
- **VueUse** - Vue组合式工具库
- **CropperJS** - 图片裁剪
- **Vue3 Emoji Picker** - 表情选择器
- **svg-captcha** - 验证码生成器
</details>

<details>
<summary><b>后端技术</b></summary>

- **Node.js** - 运行环境
- **Express.js** - Web框架
- **MySQL** - 数据库
- **JWT** - 身份认证
- **Multer** - 文件上传
- **bcrypt** - 密码加密
- **CORS** - 跨域资源共享

</details>



## 第三方API
- **图片存储：** 灌装的示例图片来自 [栗次元图床](https://t.alcy.cc/)，提供稳定的图片存储服务
- **图片上传：** 用户上传图片使用了 [夏柔API](https://api.aa1.cn/doc/xinyew_jdtc.html)，确保图片上传的稳定性和速度
- **属地查询：** IP属地查询服务使用 [保罗API](https://api.pearktrue.cn/dashboard/detail/290)，实现精准的IP属地定位功能


## 环境要求

| 组件 | 版本要求 |
|------|----------|
| Node.js | >= 16.0.0 |
| MySQL | >= 5.7 |
| MariaDB | >= 10.3 |
| npm | >= 8.0.0 |
| yarn | >= 1.22.0 |
| 浏览器 | 支持ES6+ |

> 提示：上述为传统本地开发的最低版本要求。若使用 Docker 部署，默认镜像版本如下：MySQL 8.0、Node 18-alpine（前后端构建/运行）、Nginx alpine；Docker >= 20、Docker Compose >= 2。详见[部署指南文档](./doc/DEPLOYMENT.md)。

## 环境配置

项目使用环境变量进行配置管理，前后端分别有独立的 `.env` 文件：

### 后端配置 (express-project/.env)

```env
# 服务器配置
PORT=3001
NODE_ENV=development

# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=xiaoshiliu
DB_PORT=3306

# JWT配置
JWT_SECRET=xiaoshiliu_secret_key_2025
JWT_EXPIRES_IN=7d

# 上传配置
UPLOAD_MAX_SIZE=50mb
# 图片上传策略 (local: 本地存储, imagehost: 第三方图床)
UPLOAD_STRATEGY=imagehost

# 本地存储配置
LOCAL_UPLOAD_DIR=uploads
LOCAL_BASE_URL=http://localhost:3001

# 第三方图床配置
IMAGEHOST_API_URL=https://api.xinyew.cn/api/jdtc
IMAGEHOST_TIMEOUT=60000
```

### 前端配置 (vue3-project/.env)

```env
# API基础URL配置
VITE_API_BASE_URL=http://localhost:3001/api

# 应用配置
VITE_USE_REAL_API=true
VITE_APP_TITLE=小石榴图文社区
```

> 💡 **配置说明**：
> - 后端支持本地存储和第三方图床两种上传策略
> - 前端使用 Vite 环境变量，变量名需以 `VITE_` 开头
> - 详细配置说明请参考 [部署指南](./doc/DEPLOYMENT.md)

### 1. 安装依赖

```bash
# 使用 cnpm或npm
cnpm install
# 或使用 yarn
yarn install
```

### 2. 启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 或使用 yarn
yarn dev
```

开发服务器将在 `http://localhost:5173` 启动

### 3. 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

> ⚠️ **重要提醒**：前端项目需要配合后端服务使用，详细配置请查看 [部署指南](./doc/DEPLOYMENT.md)

## Star历史

[![Star History Chart](https://api.star-history.com/svg?repos=ZTMYO/XiaoShiLiu&type=Date)](https://www.star-history.com/#ZTMYO/XiaoShiLiu&Date)

---

<div align="center">

Copyright © 2025 - **XiaoShiLiu**\
By ZTMYO\
Made with ❤️ & ⌨️

</div>


