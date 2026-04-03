# Supabase 后端集成计划

## 项目结构规划

基于现有的 Next.js App Router 结构，建议的文件目录划分如下：

```
src/
├── app/
│   ├── plan/                    # 计划管理页面
│   │   ├── page.tsx            # 计划列表页
│   │   └── [id]/               # 单个计划详情页
│   │       └── page.tsx
│   └── api/                    # API 路由（可选）
│       └── tasks/
│           └── route.ts
├── components/
│   ├── plan/                   # 计划相关组件
│   │   ├── task-list.tsx       # 任务列表组件
│   │   ├── task-form.tsx       # 任务表单组件
│   │   └── task-item.tsx       # 单个任务项组件
│   └── ui/                     # 通用 UI 组件
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # 浏览器端 Supabase 客户端
│   │   ├── server.ts           # 服务端 Supabase 客户端
│   │   └── types.ts            # Supabase 类型定义
│   └── utils.ts
└── types/
    └── index.ts                # 共享类型定义
```

## 实现步骤

### 1. 安装依赖

* 安装 `@supabase/supabase-js` 包

* （可选）安装 `@supabase/ssr` 用于服务端渲染支持

### 2. 配置环境变量

创建 `.env.local` 文件：

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. 创建 Supabase 客户端

* `src/lib/supabase/client.ts`: 浏览器端客户端（使用 `@supabase/ssr`）

* `src/lib/supabase/server.ts`: 服务端客户端（用于 Server Components/Actions）

### 4. 数据库 Schema 设计

**表名**: `tasks`

| 字段名           | 类型                       | 说明    | 约束                          |
| ------------- | ------------------------ | ----- | --------------------------- |
| id            | uuid                     | 主键    | DEFAULT gen\_random\_uuid() |
| title         | text                     | 任务名   | NOT NULL                    |
| description   | text                     | 任务描述  | NULLABLE                    |
| start\_time   | timestamp with time zone | 开始时间  | NOT NULL                    |
| end\_time     | timestamp with time zone | 结束时间  | NULLABLE                    |
| parent\_id    | uuid                     | 父任务ID | NULLABLE, FK(tasks.id)      |
| is\_completed | boolean                  | 是否完成  | DEFAULT false               |
| created\_at   | timestamp with time zone | 创建时间  | DEFAULT now()               |
| updated\_at   | timestamp with time zone | 更新时间  | DEFAULT now()               |

### 5. 类型定义

在 `src/lib/supabase/types.ts` 中定义 TypeScript 接口

### 6. 创建数据库辅助函数

创建辅助函数用于 CRUD 操作：

* `getTasks()`: 获取所有任务

* `getTaskById(id)`: 获取单个任务

* `createTask(task)`: 创建任务

* `updateTask(id, task)`: 更新任务

* `deleteTask(id)`: 删除任务

### 7. 实现任务管理页面

* 计划列表页（展示所有任务，支持父子任务层级展示）

* 任务详情页（查看/编辑单个任务）

* 任务创建/编辑表单

### 8. 实现任务管理组件

* `TaskList`: 任务列表组件

* `TaskForm`: 任务表单组件

* `TaskItem`: 单个任务展示组件

## 关键实现细节

### Supabase 客户端初始化

```typescript
// 浏览器端
import { createBrowserClient } from '@supabase/ssr'

// 服务端
import { createServerClient } from '@supabase/ssr'
```

### 父子任务关系处理

* 在前端通过 `parent_id` 字段实现父子任务关联

* 获取任务时可使用 Supabase 的 `selfjoin` 查询

* 支持无限层级的任务嵌套

## 下一步

1. 安装 Supabase 相关依赖
2. 在 Supabase Dashboard 创建 tasks 表
3. 配置环境变量
4. 按照上述结构逐步实现

