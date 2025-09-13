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

## 環境配置

項目使用環境變數進行配置管理，前後端分別有獨立的 `.env` 文件：

### 後端配置 (express-project/.env)

```env
# 伺服器配置
PORT=3001
NODE_ENV=development

# 資料庫配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=xiaoshiliu
DB_PORT=3306

# JWT配置
JWT_SECRET=xiaoshiliu_secret_key_2025
JWT_EXPIRES_IN=7d

# 上傳配置
UPLOAD_MAX_SIZE=50mb
# 圖片上傳策略 (local: 本地儲存, imagehost: 第三方圖床)
UPLOAD_STRATEGY=imagehost

# 本地儲存配置
LOCAL_UPLOAD_DIR=uploads
LOCAL_BASE_URL=http://localhost:3001

# 第三方圖床配置
IMAGEHOST_API_URL=https://api.xinyew.cn/api/jdtc
IMAGEHOST_TIMEOUT=60000
```

### 前端配置 (vue3-project/.env)

```env
# API基礎URL配置
VITE_API_BASE_URL=http://localhost:3001/api

# 應用配置
VITE_USE_REAL_API=true
VITE_APP_TITLE=小石榴圖文社區
```

> 💡 **配置說明**：
> - 後端支援本地儲存和第三方圖床兩種上傳策略
> - 前端使用 Vite 環境變數，變數名需以 `VITE_` 開頭
> - 詳細配置說明請參考 [部署指南](DEPLOYMENT_zh-Hant.md)

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
