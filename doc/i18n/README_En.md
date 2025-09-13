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
