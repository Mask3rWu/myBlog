---
title: 操作系统核心概念与原理
date: 2024-04-15
excerpt: 系统学习操作系统的核心知识，包括进程与线程、内存管理、文件系统、设备管理以及并发控制等关键概念。
tags:
  - 操作系统
  - 进程管理
  - 内存管理
---

# 操作系统概述

操作系统是计算机系统的核心软件，它管理硬件资源并为应用程序提供运行环境。

## 操作系统的核心功能

```
┌─────────────────────────────────────────┐
│              用户应用程序                 │
├─────────────────────────────────────────┤
│     系统调用接口（API）                  │
├─────────────────────────────────────────┤
│  进程管理 │ 内存管理 │ 文件系统 │ 设备管理 │
├─────────────────────────────────────────┤
│              内核                        │
├─────────────────────────────────────────┤
│              硬件                        │
└─────────────────────────────────────────┘
```

## 进程与线程

### 进程的定义

进程是程序的一次执行过程，是系统进行资源分配和调度的基本单位：

```python
class Process:
    def __init__(self, pid, program):
        self.pid = pid
        self.program = program
        self.state = "NEW"
        self.pc = 0  # 程序计数器
        self.registers = {}
        self.memory = MemorySegment()
        self.open_files = []
        self.children = []
        self.parent = None
```

### 进程状态转换

```
       ┌──────────┐
       │   创建   │
       └────┬─────┘
            ↓
       ┌──────────┐    调度
  ┌───→│   就绪   │───────────┐
  │    └──────────┘           │
  │         ↑                 │时间片完
  │         │                 │成/抢占
  │         │调度             ↓
  │    ┌──────────┐    ┌──────────┐
  │    │   运行   │───→│   阻塞   │
  │    └──────────┘    └──────────┘
  │         │                 │
  │         │完成             │I/O完成
  │         ↓                 ↓
       ┌──────────┐    ┌──────────┐
       │   终止   │    │   就绪   │
       └──────────┘    └──────────┘
```

### 线程的优势

线程是CPU调度的最小单位，同一进程内的线程共享地址空间：

```python
import threading

class ThreadPool:
    def __init__(self, num_workers):
        self.workers = []
        self.task_queue = queue.Queue()
        
        for _ in range(num_workers):
            worker = threading.Thread(target=self.worker)
            worker.start()
            self.workers.append(worker)
    
    def worker(self):
        while True:
            task = self.task_queue.get()
            if task is None:
                break
            task.execute()
            self.task_queue.task_done()
```

| 对比项 | 进程 | 线程 |
|--------|------|------|
| 资源占用 | 独立地址空间 | 共享地址空间 |
| 创建/销毁 | 开销大 | 开销小 |
| 通信 | IPC复杂 | 直接读写共享数据 |
| 安全性 | 完全隔离 | 需要同步 |

### 进程调度算法

```python
# 先来先服务 (FCFS)
def fcfs_scheduler(processes):
    processes.sort(key=lambda p: p.arrival_time)
    current_time = 0
    for p in processes:
        p.wait_time = current_time - p.arrival_time
        current_time += p.burst_time
        p.turnaround_time = p.wait_time + p.burst_time

# 最短作业优先 (SJF)
def sjf_scheduler(processes):
    processes.sort(key=lambda p: p.burst_time)
    # 非抢占式 SJF

# 时间片轮转 (Round Robin)
def round_robin_scheduler(processes, time_slice):
    ready_queue = processes.copy()
    current_time = 0
    while ready_queue:
        p = ready_queue.pop(0)
        if p.remaining_time > time_slice:
            current_time += time_slice
            p.remaining_time -= time_slice
            ready_queue.append(p)
        else:
            current_time += p.remaining_time
            p.turnaround_time = current_time
```

## 进程同步与通信

### 临界区问题

```python
import threading
import mutex

class CriticalSection:
    def __init__(self):
        self.lock = threading.Lock()
    
    def enter(self):
        self.lock.acquire()
    
    def exit(self):
        self.lock.release()
    
    def work(self):
        self.enter()
        try:
            # 临界区代码
            pass
        finally:
            self.exit()

# 生产者-消费者问题
class BoundedBuffer:
    def __init__(self, capacity):
        self.buffer = [None] * capacity
        self.count = 0
        self.in_idx = 0
        self.out_idx = 0
        self.mutex = threading.Lock()
        self.not_full = threading.Condition(self.mutex)
        self.not_empty = threading.Condition(self.mutex)
    
    def produce(self, item):
        with self.not_full:
            while self.count == len(self.buffer):
                self.not_full.wait()
            self.buffer[self.in_idx] = item
            self.in_idx = (self.in_idx + 1) % len(self.buffer)
            self.count += 1
            self.not_empty.notify()
    
    def consume(self):
        with self.not_empty:
            while self.count == 0:
                self.not_empty.wait()
            item = self.buffer[self.out_idx]
            self.out_idx = (self.out_idx + 1) % len(self.buffer)
            self.count -= 1
            self.not_full.notify()
            return item
```

### 死锁

死锁的四个必要条件：
1. **互斥**：资源一次只能被一个进程使用
2. **持有并等待**：进程持有资源同时等待其他资源
3. **不可抢占**：资源不能被强制释放
4. **循环等待**：进程间形成循环等待链

```python
# 死锁检测算法
def detect_deadlock(graph):
    """
    graph: 有向图表示资源分配
    返回是否存在环路（死锁）
    """
    in_degree = {node: 0 for node in graph}
    
    # 计算入度
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1
    
    # Kahn算法拓扑排序
    queue = [n for n in graph if in_degree[n] == 0]
    count = 0
    
    while queue:
        node = queue.pop(0)
        count += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    return count != len(graph)  # 有环路
```

## 内存管理

### 地址空间与内存保护

```python
class MemoryManager:
    def __init__(self, total_size):
        self.total_size = total_size
        self.free_list = [(0, total_size)]
        self.allocations = {}
    
    def allocate(self, process_id, size):
        # 首次适配
        for i, (addr, free_size) in enumerate(self.free_list):
            if free_size >= size:
                allocated_addr = addr
                self.allocations[process_id] = (allocated_addr, size)
                
                # 更新空闲链表
                if free_size == size:
                    self.free_list.pop(i)
                else:
                    self.free_list[i] = (addr + size, free_size - size)
                
                return allocated_addr
        return None  # 分配失败
    
    def deallocate(self, process_id):
        if process_id in self.allocations:
            addr, size = self.allocations.pop(process_id)
            self.free_list.append((addr, size))
            self.free_list.sort()
            # 合并相邻空闲块
            self.merge_free_blocks()
```

### 分页与分段

| 特性 | 分页 | 分段 |
|------|------|------|
| 划分方式 | 固定大小 | 可变大小 |
| 视角 | 物理内存 | 用户视角 |
| 优点 | 无外部碎片 | 自然的程序结构 |
| 缺点 | 内部碎片 | 有外部碎片 |

```python
class PagingSystem:
    def __init__(self, page_size):
        self.page_size = page_size
        self.page_table = {}
    
    def translate(self, virtual_addr):
        page_num = virtual_addr // self.page_size
        offset = virtual_addr % self.page_size
        
        if page_num not in self.page_table:
            raise PageFault(page_num)
        
        frame_num = self.page_table[page_num]
        return frame_num * self.page_size + offset
    
    def handle_page_fault(self, page_num):
        # 页面置换
        frame = self.find_free_frame()
        if frame is None:
            frame = self.lru_replacement()
        self.load_page(page_num, frame)
        self.page_table[page_num] = frame
```

### 虚拟内存

```python
class VirtualMemory:
    def __init__(self, swap_space_size):
        self.swap_space = bytearray(swap_space_size)
        self.physical_memory = bytearray(1024 * 1024)  # 1MB 物理内存
        self.page_table = {}
    
    def access(self, virtual_addr):
        vpn = virtual_addr // PAGE_SIZE
        offset = virtual_addr % PAGE_SIZE
        
        if vpn not in self.page_table:
            self.page_fault_handler(vpn)
        
        pte = self.page_table[vpn]
        if not pte.present:
            self.page_fault_handler(vpn)
            pte = self.page_table[vpn]
        
        pte.referenced = True
        physical_addr = pte.frame * PAGE_SIZE + offset
        return self.physical_memory[physical_addr]
```

## 文件系统

### 文件组织结构

```
文件系统层次结构：
应用程序 → 系统调用 → 文件系统接口 → 文件组织模块 → 目录管理 → 空间管理 → 设备驱动
```

### 目录实现

```python
class FileSystem:
    def __init__(self, disk_size):
        self.inode_table = [None] * MAX_INODES
        self.free_block_bitmap = [0] * (disk_size // BLOCK_SIZE)
        self.root = Directory("/")
    
    def create_file(self, path, permissions):
        parent, name = self.parse_path(path)
        
        if parent.find(name):
            raise FileExistsError()
        
        inode = self.allocate_inode()
        inode.mode = permissions
        inode.size = 0
        inode.blocks = []
        
        new_file = File(name, inode)
        parent.add_entry(new_file)
        return inode
```

### 文件分配方式

| 方式 | 特点 | 缺点 |
|------|------|------|
| 连续分配 | 顺序访问快 | 外部碎片、文件不能增长 |
| 链接分配 | 无碎片、文件可增长 | 不支持随机访问 |
| 索引分配 | 随机访问、无碎片 | 小文件开销大 |

## 设备管理

### I/O 控制方式

1. **程序控制I/O**：CPU轮询等待，效率低
2. **中断驱动I/O**：设备完成时中断通知CPU
3. **DMA（直接内存访问）**：大批量数据传输

```python
class DMAController:
    def __init__(self):
        self.channels = {}
    
    def start_transfer(self, channel, src, dst, size):
        request = DMARequest(channel, src, dst, size)
        self.channels[channel] = request
        self.setup_device(channel)
        self.enable_channel(channel)
    
    def complete(self, channel):
        request = self.channels[channel]
        request.completed = True
        self.notify_cpu(request.interrupt)
```

理解操作系统原理对于系统编程、性能优化和问题诊断都至关重要。
