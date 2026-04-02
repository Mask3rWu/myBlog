---
title: 数据结构与算法核心知识
date: 2024-04-22
excerpt: 系统梳理常用数据结构（数组、链表、树、图、哈希表）和核心算法（排序、搜索、动态规划、贪心），附Python实现与复杂度分析。
tags:
  - 数据结构
  - 算法
  - 时间复杂度
---

# 数据结构与算法概述

数据结构是组织和存储数据的方式，算法是解决问题的步骤。优秀的数据结构配合恰当的算法是写出高效程序的关键。

## 时间复杂度分析

### 大O表示法

```python
# 复杂度从低到高排序
# O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
```

| 复杂度 | 名称 | 经典算法 |
|--------|------|----------|
| O(1) | 常数 | 数组访问 |
| O(log n) | 对数 | 二分查找 |
| O(n) | 线性 | 遍历数组 |
| O(n log n) | 线性对数 | 归并排序 |
| O(n²) | 平方 | 冒泡排序 |
| O(2ⁿ) | 指数 | 递归斐波那契 |
| O(n!) | 阶乘 | 全排列 |

## 线性数据结构

### 数组（Array）

```python
class DynamicArray:
    def __init__(self):
        self.size = 0
        self.capacity = 1
        self.data = [None] * self.capacity
    
    def __len__(self):
        return self.size
    
    def __getitem__(self, index):
        if 0 <= index < self.size:
            return self.data[index]
        raise IndexError("Index out of range")
    
    def append(self, element):
        if self.size == self.capacity:
            self.resize(2 * self.capacity)
        self.data[self.size] = element
        self.size += 1
    
    def resize(self, new_capacity):
        new_data = [None] * new_capacity
        for i in range(self.size):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity
```

**复杂度分析**：
- 访问：O(1)
- 尾部插入：O(1) 均摊
- 中间插入/删除：O(n)

### 链表（Linked List）

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def append(self, val):
        node = ListNode(val)
        if not self.tail:
            self.head = self.tail = node
        else:
            self.tail.next = node
            self.tail = node
        self.size += 1
    
    def prepend(self, val):
        node = ListNode(val, self.head)
        self.head = node
        if not self.tail:
            self.tail = node
        self.size += 1
    
    def delete(self, val):
        if not self.head:
            return False
        
        if self.head.val == val:
            self.head = self.head.next
            self.size -= 1
            return True
        
        curr = self.head
        while curr.next:
            if curr.next.val == val:
                curr.next = curr.next.next
                self.size -= 1
                return True
            curr = curr.next
        return False
```

**复杂度分析**：
- 访问：O(n)
- 头部插入/删除：O(1)
- 尾部插入：O(1)
- 中间插入/删除：O(n)

### 栈与队列

```python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Stack is empty")
    
    def peek(self):
        return self.items[-1] if self.items else None
    
    def is_empty(self):
        return len(self.items) == 0

# 队列实现
class Queue:
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.pop(0)
        raise IndexError("Queue is empty")
    
    def front(self):
        return self.items[0] if self.items else None

# 循环队列
class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.head = self.tail = -1
    
    def enqueue(self, item):
        if (self.tail + 1) % self.capacity == self.head:
            raise OverflowError("Queue is full")
        if self.head == -1:
            self.head = self.tail = 0
        else:
            self.tail = (self.tail + 1) % self.capacity
        self.queue[self.tail] = item
    
    def dequeue(self):
        if self.head == -1:
            raise IndexError("Queue is empty")
        item = self.queue[self.head]
        if self.head == self.tail:
            self.head = self.tail = -1
        else:
            self.head = (self.head + 1) % self.capacity
        return item
```

## 树形数据结构

### 二叉树

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BinaryTree:
    def __init__(self, root=None):
        self.root = root
    
    def inorder_traverse(self, node):
        if node:
            self.inorder_traverse(node.left)
            print(node.val, end=" ")
            self.inorder_traverse(node.right)
    
    def preorder_traverse(self, node):
        if node:
            print(node.val, end=" ")
            self.preorder_traverse(node.left)
            self.preorder_traverse(node.right)
    
    def postorder_traverse(self, node):
        if node:
            self.postorder_traverse(node.left)
            self.postorder_traverse(node.right)
            print(node.val, end=" ")
    
    def level_order_traverse(self, root):
        if not root:
            return []
        result, queue = [], [root]
        while queue:
            node = queue.pop(0)
            result.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return result
```

### 二叉搜索树（BST）

```python
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert_recursive(self.root, val)
    
    def _insert_recursive(self, node, val):
        if not node:
            return TreeNode(val)
        if val < node.val:
            node.left = self._insert_recursive(node.left, val)
        else:
            node.right = self._insert_recursive(node.right, val)
        return node
    
    def search(self, val):
        return self._search_recursive(self.root, val)
    
    def _search_recursive(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search_recursive(node.left, val)
        return self._search_recursive(node.right, val)
    
    def delete(self, val):
        self.root = self._delete_recursive(self.root, val)
    
    def _delete_recursive(self, node, val):
        if not node:
            return None
        if val < node.val:
            node.left = self._delete_recursive(node.left, val)
        elif val > node.val:
            node.right = self._delete_recursive(node.right, val)
        else:
            if not node.left:
                return node.right
            if not node.right:
                return node.left
            successor = self._find_min(node.right)
            node.val = successor.val
            node.right = self._delete_recursive(node.right, successor.val)
        return node
```

## 图结构

```python
class Graph:
    def __init__(self):
        self.adjacency_list = {}
    
    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []
    
    def add_edge(self, v1, v2, directed=False):
        self.add_vertex(v1)
        self.add_vertex(v2)
        self.adjacency_list[v1].append((v2))
        if not directed:
            self.adjacency_list[v2].append(v1)
    
    def bfs(self, start):
        visited = set()
        queue = [start]
        result = []
        
        while queue:
            vertex = queue.pop(0)
            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)
                for neighbor in self.adjacency_list.get(vertex, []):
                    if neighbor not in visited:
                        queue.append(neighbor)
        return result
    
    def dfs(self, start, visited=None):
        if visited is None:
            visited = set()
        
        visited.add(start)
        result = [start]
        
        for neighbor in self.adjacency_list.get(start, []):
            if neighbor not in visited:
                result.extend(self.dfs(neighbor, visited))
        return result
```

## 排序算法

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)
```

## 查找算法

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

## 动态规划

```python
def fibonacci_dp(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# 背包问题
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i-1]] + values[i-1])
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]
```

掌握数据结构与算法是每个程序员的必修课，它们是解决复杂问题的基础工具。
