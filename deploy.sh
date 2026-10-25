#!/usr/bin/env bash
# ============================================================
# 一键部署到 GitHub Pages
# 用法：bash deploy.sh <你的Personal Access Token>
# ============================================================
set -e

TOKEN="$1"
REPO="ringo1597/Mjq-staticWebpage"
SRC="D:/aiWork/workBuddyProjects/wbDemo1"
GH="/c/Users/Administrator/.workbuddy/binaries/gh/bin/gh.exe"

if [ -z "$TOKEN" ]; then
  echo "❌ 请提供 Token：bash deploy.sh ghp_xxxxxxxxxxxx"
  exit 1
fi

echo "==> 1/6 登录 GitHub"
export GH_TOKEN="$TOKEN"
"$GH" auth status || { echo "❌ Token 无效或权限不足"; exit 1; }

echo "==> 2/6 检查仓库 $REPO"
if "$GH" repo view "$REPO" >/dev/null 2>&1; then
  echo "    仓库已存在"
else
  echo "    创建仓库（public + Pages）"
  "$GH" repo create "$REPO" --public --description "小羊同学的生日纪念网页" --add-readme
fi

echo "==> 3/6 准备本地仓库"
cd "$SRC"
git config user.name "soulmate"
git config user.email "soulmate@local"
git add -A
if git diff --cached --quiet; then
  echo "    没有新改动"
else
  git commit -m "更新小羊同学生日纪念网页"
fi

echo "==> 4/6 推送到 GitHub"
git branch -M main
"$GH" repo set-default "$REPO" >/dev/null 2>&1 || true
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$REPO.git"
# 用 token 做 push（不写入 .git/config，避免泄露）
git -c "http.https://github.com/.extraheader=AUTHORIZATION: basic $(printf 'x-access-token:%s' "$TOKEN" | base64 -w0)" push -u origin main

echo "==> 5/6 开启 GitHub Pages"
mkdir -p .github/workflows

# 先触发 Actions 部署（workflow 已提交到仓库时会自动跑）
if "$GH" workflow list --repo "$REPO" 2>/dev/null | grep -q "deploy.yml"; then
  echo "    触发 deploy.yml"
  "$GH" workflow run deploy.yml --repo "$REPO" || echo "    触发失败，将改用 Pages API"
fi

sleep 3

# 用 Pages API 兜底开启（source 必须是 build_type + branch/path 或 html）
"$GH" api --method POST "repos/$REPO/pages" \
  --input - <<'JSON' 2>/dev/null || echo "    Pages API 调用未成功（可能已开启，请到 Settings → Pages 确认）"
{"source":{"branch":"main","path":"/"},"build_type":"legacy"}
JSON

echo "==> 6/6 完成"
echo ""
echo "🎉 部署完成！网址是："
echo "    https://ringo1597.github.io/Mjq-staticWebpage/"
echo ""
echo "如果第一次打开是 404，请等 1-2 分钟（Pages 在构建中），"
echo "或在仓库 Settings → Pages 里确认 Source 为 'GitHub Actions'。"
