---
title: React 性能优化指南
date: 2024-03-01
excerpt: 深入探讨 React 应用性能优化的各种技巧，包括 React.memo、useMemo、useCallback 的正确使用，以及如何避免不必要的重渲染。
tags:
  - React
  - 性能优化
---

# 性能优化先找瓶颈

React 性能问题通常不是因为“少了一个 memo”，而是状态边界和渲染边界设计得不够好。

## 先做什么

1. 先定位重复渲染。
2. 再拆分组件边界。
3. 最后才考虑局部缓存策略。
