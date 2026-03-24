# My Blog

一个使用 Next.js 14 (App Router) 和 Tailwind CSS 构建的静态博客。

文章内容现在通过 Markdown 文件管理，统一放在 `content/posts/` 目录下。

在线访问地址：

- https://mask3rwu.github.io/myBlog/

## 特性

- ⚡ Next.js 14 + React 18
- 🎨 Tailwind CSS
- 📝 TypeScript
- 📱 响应式设计
- 🚀 GitHub Pages 静态部署

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建静态文件
npm run build
```

## 文章管理

文章文件统一放在 `content/posts/` 下，推荐使用二级目录按主题分类：

```text
content/posts/
  frontend/
    hello-world.md
  react/
    react-performance.md
```

每篇文章使用 frontmatter：

```md
---
title: 文章标题
date: 2026-03-24
excerpt: 列表页摘要
tags:
  - React
  - 性能
---

# 正文标题

这里写 Markdown 正文。
```

构建时会自动：

- 扫描 `content/posts/**/*.md`
- 按日期生成文章列表
- 根据目录生成文章路径，例如 `content/posts/react/react-performance.md` 会生成 `/posts/react/react-performance`
- 渲染标签、摘要和正文

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支
3. 推送代码后会自动部署

> 当前部署地址：`https://mask3rwu.github.io/myBlog/`
