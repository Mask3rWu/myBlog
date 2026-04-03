# Supabase 集成指南

本项目已集成 Supabase 后端服务，用于任务管理功能。以下是详细的设置和使用说明。

## 快速开始

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 在项目设置中获取以下信息：
   - Project URL
   - anon/public key

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

填写你的 Supabase 项目信息：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 创建数据库表

在 Supabase Dashboard 中打开 SQL Editor，运行以下 SQL：

```sql
-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  parent_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_tasks_parent_id ON tasks(parent_id);
CREATE INDEX idx_tasks_is_completed ON tasks(is_completed);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access" ON tasks FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON tasks FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON tasks FOR DELETE USING (true);
```

或者，你可以在 `supabase/migrations/001_create_tasks_table.sql` 找到完整的 SQL 脚本。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000/plan 并切换到"任务管理"标签页。

## 项目结构

```
src/
├── app/plan/page.tsx              # 计划页面（包含任务管理）
├── components/plan/
│   ├── task-list.tsx             # 任务列表组件
│   ├── task-form.tsx            # 任务表单组件
│   └── task-item.tsx           # 单个任务展示组件
└── lib/
    └── supabase/
        ├── client.ts            # 浏览器端客户端
        ├── server.ts            # 服务端客户端
        ├── types.ts            # TypeScript 类型定义
        └── database.ts         # 数据库操作函数
```

## 任务功能

### 任务字段

- **title**: 任务名称（必填）
- **description**: 任务描述（可选）
- **start_time**: 开始时间（必填）
- **end_time**: 结束时间（可选）
- **parent_id**: 父任务ID（用于创建子任务）
- **is_completed**: 是否完成

### 主要功能

1. **创建任务**: 点击"新建任务"按钮
2. **编辑任务**: 点击任务的"编辑"按钮
3. **删除任务**: 点击任务的"删除"按钮
4. **标记完成**: 点击任务左侧的圆形图标
5. **添加子任务**: 点击"添加子任务"按钮
6. **层级显示**: 支持父子任务的层级展示和折叠/展开

## API 函数

在 `src/lib/supabase/database.ts` 中提供了以下辅助函数：

- `getTasks()`: 获取所有任务
- `getTaskById(id)`: 获取单个任务
- `createTask(task)`: 创建新任务
- `updateTask(id, updates)`: 更新任务
- `deleteTask(id)`: 删除任务
- `getSubtasks(parentId)`: 获取子任务
- `getRootTasks()`: 获取根任务（无父任务）
- `getCompletedTasks()`: 获取已完成任务
- `getPendingTasks()`: 获取待办任务

## 使用示例

### 在客户端组件中使用

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Task } from '@/lib/supabase/types'

export function MyComponent() {
  const [tasks, setTasks] = useState<Task[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await supabase.from('tasks').select('*')
      setTasks(data || [])
    }
    fetchTasks()
  }, [])

  return <div>{/* render tasks */}</div>
}
```

### 在服务端组件中使用

```typescript
import { createClient } from '@/lib/supabase/server'
import { Task } from '@/lib/supabase/types'

export async function getTasks(): Promise<Task[]> {
  const supabase = createClient()
  const { data } = await supabase.from('tasks').select('*')
  return data || []
}
```

## 安全说明

当前配置使用了公开访问策略（RLS 策略允许所有操作）。在实际生产环境中，建议：

1. 添加用户认证
2. 配置更严格的 RLS 策略
3. 使用服务端组件和 API 路由来保护敏感操作

## 进一步优化

- 添加用户认证和授权
- 实现实时订阅（Supabase Realtime）
- 添加更多的查询过滤和排序选项
- 优化 UI/UX 设计
- 添加数据导出功能
