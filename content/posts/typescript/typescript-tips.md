---
title: TypeScript 实用技巧与最佳实践
date: 2024-02-15
excerpt: 分享我在项目中使用 TypeScript 的一些实用技巧，包括类型推断、泛型应用、装饰器使用等，帮助你写出更健壮的代码。
tags:
  - TypeScript
  - 最佳实践
---

# TypeScript 的真正收益

TypeScript 最有价值的地方，不是“有类型”，而是你可以持续约束复杂度。

## 实践建议

- 为共享数据结构建立清晰接口。
- 让运行时数据在入口完成校验。
- 减少 `any`，优先做类型收窄。
