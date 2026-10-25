# 🚀 部署到 GitHub Pages —— 操作指引

## 一句话版本

去 [github.com/settings/tokens](https://github.com/settings/tokens) 生成一个 Token，
粘给我，或者你自己跑一条命令。

---

## 方式 A：把 Token 给我（最快）

### 第 1 步：生成 Token

1. 打开 <https://github.com/settings/tokens>
2. 点右上角 **Generate new token** → **Generate new token (classic)**
3. 填写：
   - **Note**：写 `小羊同学网页部署`
   - **Expiration**：选 `90 days`（够用了）
   - **Scopes**：只勾 **✓ repo**（勾上会自动包含 `public_repo`）
4. 拉到底点 **Generate token**
5. 复制那串 `ghp_xxxxxxxxxxxxxxxxxxxx`

### 第 2 步：给我

直接发给我就行。我会立刻完成：
- 创建仓库 `ringo1597/Mjq-staticWebpage`（public）
- 推送全部代码
- 开启 GitHub Pages
- 拿到最终网址

> Token 只存在于本次对话和本机临时环境变量里，不会写进仓库、不会上传。
> 部署完你可以在 GitHub 右上角头像 → Settings → Developer settings
> → Personal access tokens 里一键 revoke 掉。

---

## 方式 B：你自己跑（不想给我 Token）

在 Git Bash 或 PowerShell 里执行：

```bash
cd /d/aiWork/workBuddyProjects/wbDemo1
bash deploy.sh 你的TOKEN粘贴在这里
```

或者 PowerShell：

```powershell
cd D:\aiWork\workBuddyProjects\wbDemo1
bash deploy.sh 你的TOKEN粘贴在这里
```

---

## 部署完成后

网址是：

```
https://ringo1597.github.io/Mjq-staticWebpage/
```

### 如果第一次打开显示 404

正常现象，Pages 首次构建需要 1-2 分钟。等一会儿刷新即可。

如果等了几分钟还是不行，去仓库 **Settings → Pages** 确认：
- **Source** 选 `GitHub Actions`（不是 `Deploy from a branch`）
- 或者看看 **Actions** 标签页里的 `deploy.yml` 有没有跑成功

### 以后怎么更新

```bash
cd /d/aiWork/workBuddyProjects/wbDemo1
# 改完文件后
git add -A
git commit -m "更新内容"
git push
```

推上去后 GitHub Actions 会自动重新部署，一两分钟生效。

> 提示：如果推的时候提示要密码，用 Token 当密码即可
> （Personal access token → 用户名填你的 GitHub 用户名，密码填 Token）。

---

## 关于「买服务器」

我上一轮问的时候提到过：**这个网页不需要买服务器**。

原因是它纯静态 —— 就是 HTML + CSS + JS + 图片视频，没有任何后端逻辑。
GitHub Pages 这类免费托管就能给你一个正式网址，而且：

| | GitHub Pages | 自购服务器 |
|---|---|---|
| 费用 | 0 元 | 需实名 + 备案（国内）+ 流量费 |
| 上线时间 | 5-10 分钟 | 买域名+备案，最快也要 1-2 周 |
| 速度 | GitHub 全球 CDN，够用 | 取决于配置 |
| 维护 | 推代码即自动部署 | 要自己配 Nginx/HTTPS/续费 |
| 域名 | `xxx.github.io`（免费） | 需另外购买 |

**但如果你确实想要一个自己的域名**（比如 `xiaoyang.xxx.com`），也有办法，
不用买服务器 —— 买域名后把 CNAME 指向 GitHub Pages，Pages 会自动签发 HTTPS 证书。

如果你有特别的原因要买服务器（比如想同时放别的东西、或者想加后端功能），
告诉我具体想做什么，我再给对应方案。

---

## 文件清单

| 文件 | 作用 |
|------|------|
| `deploy.sh` | 一键部署脚本 |
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署配置 |
| `.gitignore` | 排除 `.workbuddy/` 等本地文件 |
