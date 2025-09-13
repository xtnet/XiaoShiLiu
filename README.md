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
        <img
            src="https://img.shields.io/badge/XiaoShiLiu-v1.1.4-brightgreen.svg?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxNDAiPgo8cGF0aCBkPSJNMCAwIEMwLjk4NDg0Mzc1IDAuNDAwODk4NDQgMS45Njk2ODc1IDAuODAxNzk2ODcgMi45ODQzNzUgMS4yMTQ4NDM3NSBDMjEuMTI2MDk3NSA5LjMyMjIxOTc0IDMyLjY5NTAzOTgyIDI0LjA4MjkxNDYgMzkuNjg3NSA0Mi4zMTI1IEM0NC42NTc3MjE4NyA1Ni4yNzY0NTY2NyA0NC4xNDU5OTEyNiA3NS4xNjgzMTI0IDM4LjUzNTE1NjI1IDg4Ljg1OTM3NSBDMzguMDI4NTU0NjkgODkuODk1NzgxMjUgMzcuNTIxOTUzMTMgOTAuOTMyMTg3NSAzNyA5MiBDMzYuNTAzNzEwOTQgOTMuMDM2NDA2MjUgMzYuMDA3NDIxODggOTQuMDcyODEyNSAzNS40OTYwOTM3NSA5NS4xNDA2MjUgQzI3LjgzMzg5MjI4IDEwOS41NDE4NzExNCAxNS40NzA5NTI1IDEyMS4zNzk0NjY2OSAwIDEyNyBDLTAuMDQxMjUgMTI2LjM4MTI1IC0wLjA4MjUgMTI1Ljc2MjUgLTAuMTI1IDEyNS4xMjUgQy0wLjQxMzc1IDEyNC40MjM3NSAtMC43MDI1IDEyMy43MjI1IC0xIDEyMyBDLTMuOTk2MTU5NDYgMTIxLjY5NTQzNDQgLTMuOTk2MTU5NDYgMTIxLjY5NTQzNDQgLTcgMTIxIEMtNyAxMTguMzYgLTcgMTE1LjcyIC03IDExMyBDLTYuMjg5NzI2NTYgMTEyLjczNDQ1MzEzIC01LjU3OTQ1MzEzIDExMi40Njg5MDYyNSAtNC44NDc2NTYyNSAxMTIuMTk1MzEyNSBDLTMuOTI4NTU0NjkgMTExLjg0MjEwOTM4IC0zLjAwOTQ1MzEyIDExMS40ODg5MDYyNSAtMi4wNjI1IDExMS4xMjUgQy0xLjE0NTk3NjU2IDExMC43NzY5NTMxMyAtMC4yMjk0NTMxMyAxMTAuNDI4OTA2MjUgMC43MTQ4NDM3NSAxMTAuMDcwMzEyNSBDMy4xNDk0MTA1NiAxMDkuMjE4MDkxNCAzLjE0OTQxMDU2IDEwOS4yMTgwOTE0IDQgMTA3IEM0LjA3NzMzNjExIDEwNS40NTkwMDYzMyA0LjEzNzM2OTIxIDEwMy45MTcxMTg0MyA0LjE4NzUgMTAyLjM3NSBDNC42OTA2NzUzOSA5Ni40OTA0MDY1MSA3LjI0Nzk2Nzk5IDkzLjM0ODk0NjE5IDExIDg5IEMxMS4zMyA4OC4zNCAxMS42NiA4Ny42OCAxMiA4NyBDMTYuMzM3MDYzODcgODguNzU1MDQwNjcgMTcuNTIyMjA4NTQgOTEuMjM1NzQ3NzEgMTkuNjU2MjUgOTUuMjIyNjU2MjUgQzIwLjg3MDQxMzY4IDk3LjE0MTg2OTIxIDIwLjg3MDQxMzY4IDk3LjE0MTg2OTIxIDIyLjk2ODc1IDk3LjgwODU5Mzc1IEMyNS4yMDIxMzAyNCA5OC4xNTY5NzU0NiAyNS4yMDIxMzAyNCA5OC4xNTY5NzU0NiAyOCA5NyBDMjguNDE4MzE0MDQgOTMuNzEwMDA3MTggMjguNDE4MzE0MDQgOTMuNzEwMDA3MTggMjggOTAgQzI1LjkxOTc1NjkxIDg3LjQ3ODQ5MzIyIDIzLjY3OTk1MDk5IDg1LjUzMTAzNjEgMjEuMTA5Mzc1IDgzLjUyMzQzNzUgQzE2LjE5MjYyMjc4IDc5LjMwNjIyMzE5IDE2LjE5MjYyMjc4IDc5LjMwNjIyMzE5IDE1LjYyNSA3NS40NTcwMzEyNSBDMTUuNjY3MzcwODkgNzMuNTc5NDcxMjkgMTUuNzQ5NDAxMDYgNzEuNzAyNDY1NyAxNS44NjcxODc1IDY5LjgyODEyNSBDMTYuMjkyMDg1NTYgNjAuNzgwMjk1NjMgMTIuOTExODg3NzUgNTIuMTI5MzYzMDIgNy40Njg3NSA0NC45OTIxODc1IEMyLjQxNzc5Mjk5IDM5LjQ4ODU1MDM4IC0zLjk3NzY3ODk1IDM2LjM0MDc3MzY4IC0xMSAzNCBDLTEwLjQzNjI4NTg2IDMwLjczMDQ1Nzk4IC05LjUwMDM3NzM0IDI5LjE3NDI0MTE3IC03IDI3IEMtOC45OCAyNi42NyAtMTAuOTYgMjYuMzQgLTEzIDI2IEMtMTIuMzQgMjMuNjkgLTExLjY4IDIxLjM4IC0xMSAxOSBDLTEzLjk3IDIwLjMyIC0xNi45NCAyMS42NCAtMjAgMjMgQy0yMC45OSAyMC4wMyAtMjAuOTkgMjAuMDMgLTIyIDE3IEMtMjIuNjYgMTcgLTIzLjMyIDE3IC0yNCAxNyBDLTI1LjM4OTM4MDc3IDE4Ljk2MTQ3ODc0IC0yNi43MjYwNDExIDIwLjk2MTY2NTc2IC0yOCAyMyBDLTMxLjMgMjEuNjggLTM0LjYgMjAuMzYgLTM4IDE5IEMtMzcuMzQgMjAuNjUgLTM2LjY4IDIyLjMgLTM2IDI0IEMtMzYgMjQuOTkgLTM2IDI1Ljk4IC0zNiAyNyBDLTM4LjMxIDI3LjMzIC00MC42MiAyNy42NiAtNDMgMjggQy00MS4zNSAyOS42NSAtMzkuNyAzMS4zIC0zOCAzMyBDLTM4LjU0NTI3MzQ0IDMzLjIxOTE0MDYzIC0zOS4wOTA1NDY4OCAzMy40MzgyODEyNSAtMzkuNjUyMzQzNzUgMzMuNjY0MDYyNSBDLTUwLjk2NTAyODY5IDM4LjQyMTE5MTU1IC01OC45MTExMTI2MiA0NC4xNDc4MzA1MiAtNjQuMzEyNSA1NS4zNzUgQy02Ni4yMjgwOTAwMyA2MC4zMzM5MDY0NSAtNjYuMjE5Mjg2OTIgNjUuMDEyNjg4OTYgLTY2LjMxMjUgNzAuMjUgQy02Ni40ODY4NzY5OSA3OC4xNzA4OTM4OCAtNjYuNDg2ODc2OTkgNzguMTcwODkzODggLTY4LjQzMzU5Mzc1IDgxLjMxNjQwNjI1IEMtNzAuMjE5MDkyOTEgODIuNzg3MDQzMTkgLTcxLjk3MDU0ODA3IDgzLjg5NzY4NzE2IC03NCA4NSBDLTc2Ljk2MDUwODc0IDg3LjI5MTk5NDAzIC03Ni45NjA1MDg3NCA4Ny4yOTE5OTQwMyAtNzkgOTAgQy03OS40MTgzMTQwNCA5My43MTAwMDcxOCAtNzkuNDE4MzE0MDQgOTMuNzEwMDA3MTggLTc5IDk3IEMtNzUuNjI1OTk0MjIgOTcuNDE3MjU2NzggLTc1LjYyNTk5NDIyIDk3LjQxNzI1Njc4IC03MiA5NyBDLTcwLjI2MzMzMjczIDk0LjgwMTY3Mjg3IC03MC4yNjMzMzI3MyA5NC44MDE2NzI4NyAtNjkgOTIgQy02Ny4zNzE2MzI2MiA5MC4yOTU4OTQ2IC02NS43MTIzMDI0OCA4OC42MTk3NDU1OSAtNjQgODcgQy02Mi45NzMzNDc4NyA4Ny45NzI2MTc4MSAtNjEuOTgyOTA5NjggODguOTgzMTk2ODkgLTYxIDkwIEMtNjAuMTU0Mzc1IDkwLjc4Mzc1IC01OS4zMDg3NSA5MS41Njc1IC01OC40Mzc1IDkyLjM3NSBDLTU1LjY3MDc1MTQ2IDk1LjU3NzMyOTk1IC01NS42Njk2NDU5OSA5OC40MjM0MjUzNiAtNTUuMzc1IDEwMi41NjI1IEMtNTUuMTIyODk3NzMgMTA1Ljk2NjE3NDQ1IC01NS4xMjI4OTc3MyAxMDUuOTY2MTc0NDUgLTU0IDEwOSBDLTUwLjU5NDY1MjM3IDExMS41OTU1MzkzNSAtNDcuMTA4OTgxOTEgMTEyLjg3OTk5MzIzIC00MyAxMTQgQy00MyAxMTYuMzEgLTQzIDExOC42MiAtNDMgMTIxIEMtNDMuOTQ4NzUgMTIxLjI0NzUgLTQ0Ljg5NzUgMTIxLjQ5NSAtNDUuODc1IDEyMS43NSBDLTQ5LjA5MTI5NTA2IDEyMi42NjIxMzc3NSAtNDkuMDkxMjk1MDYgMTIyLjY2MjEzNzc1IC01MC4xOTUzMTI1IDEyNS4wNzgxMjUgQy01MC40NjA4NTkzNyAxMjUuNzEyMzQzNzUgLTUwLjcyNjQwNjI1IDEyNi4zNDY1NjI1IC01MSAxMjcgQy02OC42OTU3Mjk2NyAxMTkuMTI0OTM3MDYgLTgxLjQzOTU5ODg0IDEwNi45NDczMzUyOCAtODkgODkgQy04OS40MTM3ODkwNiA4OC4wODYwNTQ2OSAtODkuODI3NTc4MTMgODcuMTcyMTA5MzggLTkwLjI1MzkwNjI1IDg2LjIzMDQ2ODc1IEMtOTUuNzUzMTk2OCA3MS45MTY5ODQyOSAtOTUuMTUyNTY5NTQgNTMuMjc2OTg2ODkgLTg5LjQ4MDQ2ODc1IDM5LjE1MjM0Mzc1IEMtODguOTkxOTE0MDYgMzguMTEyMDcwMzEgLTg4LjUwMzM1OTM4IDM3LjA3MTc5Njg3IC04OCAzNiBDLTg3LjU0MjM4MjgxIDM1LjAxMTI4OTA2IC04Ny4wODQ3NjU2MyAzNC4wMjI1NzgxMyAtODYuNjEzMjgxMjUgMzMuMDAzOTA2MjUgQy03Ny42MTMxNDg5MSAxNS4yMjU1NjI2NCAtNjMuMDQ2NjYwMSA0LjMxOTQ5MDIxIC00NC41MDc4MTI1IC0yLjIzODI4MTI1IEMtMzAuNzgxODIwODggLTYuNDA3MzkwODYgLTEzLjEwMDE0NTE2IC01LjgzNjUxNzE5IDAgMCBaICIgZmlsbD0iI2ZmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTYsNykiLz4KPHBhdGggZD0iTTAgMCBDMS4zMiAwIDIuNjQgMCA0IDAgQzQuMzMgMS4zMiA0LjY2IDIuNjQgNSA0IEM3LjMxIDQuMzMgOS42MiA0LjY2IDEyIDUgQzEyLjA2MDU4NTk0IDUuNzgyNDYwOTQgMTIuMTIxMTcxODggNi41NjQ5MjE4NyAxMi4xODM1OTM3NSA3LjM3MTA5Mzc1IEMxMi4zMDkyNzczNCA4Ljg4ODk2NDg0IDEyLjMwOTI3NzM0IDguODg4OTY0ODQgMTIuNDM3NSAxMC40Mzc1IEMxMi41MTg3MTA5NCAxMS40NDY4MzU5NCAxMi41OTk5MjE4OCAxMi40NTYxNzE4NyAxMi42ODM1OTM3NSAxMy40OTYwOTM3NSBDMTIuNzMyMTE0NjggMTUuOTM2NDA3NzkgMTIuNzMyMTE0NjggMTUuOTM2NDA3NzkgMTQgMTcgQzE2LjMyODE3OTY0IDE3LjM2NzYwNzMxIDE4LjY2MTgzODUgMTcuNzAyNDE1ODEgMjEgMTggQzIxIDE4LjY2IDIxIDE5LjMyIDIxIDIwIEMxNC40ODAzNjU4MyAyMS4xODE5NzY4NCA4LjA0OTU0ODc3IDIxLjE0ODEwNTU5IDEuNDM3NSAyMS4xMjUgQzAuMzI2OTcyNjYgMjEuMTI4ODY3MTkgLTAuNzgzNTU0NjkgMjEuMTMyNzM0MzcgLTEuOTI3NzM0MzggMjEuMTM2NzE4NzUgQy0zLjU0MzI1MTk1IDIxLjEzNDc4NTE2IC0zLjU0MzI1MTk1IDIxLjEzNDc4NTE2IC01LjE5MTQwNjI1IDIxLjEzMjgxMjUgQy02LjE2Mjc5NTQxIDIxLjEzMTY4NDU3IC03LjEzNDE4NDU3IDIxLjEzMDU1NjY0IC04LjEzNTAwOTc3IDIxLjEyOTM5NDUzIEMtMTEuMTU2NjU0MzcgMjAuOTkyOTI0ODYgLTE0LjAyODg1ODk1IDIwLjU1NDAxMTQ5IC0xNyAyMCBDLTE3IDE5LjM0IC0xNyAxOC42OCAtMTcgMTggQy0xNS44NjU2MjUgMTcuODU1NjI1IC0xNC43MzEyNSAxNy43MTEyNSAtMTMuNTYyNSAxNy41NjI1IEMtMTAuMTkyMjI3OTkgMTcuMzg4Mjg1MjIgLTEwLjE5MjIyNzk5IDE3LjM4ODI4NTIyIC05IDE2IEMtOC43NjYzNjExOSAxNC4xNTEwODA1NCAtOC41ODY5NjM2NSAxMi4yOTUxMTk2OSAtOC40Mzc1IDEwLjQzNzUgQy04LjM1MzcxMDk0IDkuNDI1NTg1OTQgLTguMjY5OTIxODggOC40MTM2NzE4OCAtOC4xODM1OTM3NSA3LjM3MTA5Mzc1IEMtOC4xMjMwMDc4MSA2LjU4ODYzMjgxIC04LjA2MjQyMTg3IDUuODA2MTcxODggLTggNSBDLTQuNTM1IDQuNTA1IC00LjUzNSA0LjUwNSAtMSA0IEMtMC42NyAyLjY4IC0wLjM0IDEuMzYgMCAwIFogIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2OSwxMTcpIi8+Cjwvc3ZnPgo=">
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


