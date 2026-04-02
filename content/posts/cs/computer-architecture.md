---
title: 计算机组成原理：从晶体管到CPU
date: 2024-04-08
excerpt: 深入理解计算机硬件架构，从逻辑门、触发器、寄存器到CPU指令执行，揭示计算机如何执行程序的奥秘。
tags:
  - 计算机组成
  - CPU
  - 数字电路
---

# 计算机组成概述

计算机组成原理是计算机科学的核心基础，它揭示了计算机硬件如何协同工作来执行程序指令。

## 计算机基本结构

冯·诺依曼体系结构是现代计算机的基础：

```
┌─────────────┐
│   输入设备   │
└──────┬──────┘
       ↓
┌─────────────┐     ┌─────────────┐
│   存储器    │ ←→  │   运算器    │
└──────┬──────┘     └──────┬──────┘
       ↑                   ↑
       └────────┬──────────┘
                ↓
         ┌─────────────┐
         │   控制器    │
         └──────┬──────┘
                ↓
         ┌─────────────┐
         │   输出设备   │
         └─────────────┘
```

核心特点：
1. **存储程序**：指令和数据以相同方式存储
2. **顺序执行**：指令按顺序执行（除跳转外）
3. **二进制表示**：所有信息用二进制编码

## 数据的表示与运算

### 进位计数制

| 进制 | 基数 | 符号 | 示例 |
|------|------|------|------|
| 二进制 | 2 | 0,1 | 1011 |
| 八进制 | 8 | 0-7 | 273 |
| 十进制 | 10 | 0-9 | 234 |
| 十六进制 | 16 | 0-9,A-F | 0xA3 |

### 进制转换

```python
# 十进制转二进制
def decimal_to_binary(n):
    if n == 0:
        return "0"
    binary = ""
    while n > 0:
        binary = str(n % 2) + binary
        n //= 2
    return binary

# 二进制转十六进制（每4位一组）
def binary_to_hex(binary_str):
    # 补齐到4的倍数
    n = len(binary_str) % 4
    if n:
        binary_str = "0" * (4 - n) + binary_str
    
    hex_map = {"0000": "0", "0001": "1", "0010": "2", "0011": "3",
               "0100": "4", "0101": "5", "0110": "6", "0111": "7",
               "1000": "8", "1001": "9", "1010": "A", "1011": "B",
               "1100": "C", "1101": "D", "1110": "E", "1111": "F"}
    
    result = ""
    for i in range(0, len(binary_str), 4):
        result += hex_map[binary_str[i:i+4]]
    return result
```

### 原码、反码、补码

| 类型 | 表示方法 | 范围（8位） | 特点 |
|------|----------|-------------|------|
| 原码 | 符号位+绝对值 | -127~+127 | 0有两种表示 |
| 反码 | 负数取反 | -127~+127 | 运算复杂 |
| 补码 | 负数取反+1 | -128~+127 | 统一处理，0唯一 |

## 布尔代数与逻辑门

### 基本逻辑运算

```
与（AND）：A·B 或 AB  - 全1出1
或（OR）：A+B        - 有1出1
非（NOT）：A'        - 取反
```

### 复合逻辑

```python
# 与非门 (NAND) - 通用门
def nand(a, b):
    return not (a and b)

# 或非门 (NOR)
def nor(a, b):
    return not (a or b)

# 异或门 (XOR)
def xor(a, b):
    return a != b

# 同或门 (XNOR)
def xnor(a, b):
    return a == b
```

### 组合逻辑电路

- **加法器**：半加器、全加器、串行进位加法器、超前进位加法器
- **编码器/译码器**：多路选择、数据转换
- **比较器**：数值比较
- **锁存器/触发器**：存储1位数据

## 组合逻辑部件

### 算术逻辑单元（ALU）

```python
class ALU:
    """简化的ALU模型"""
    def __init__(self):
        self.result = 0
        self.zero = False
        self.negative = False
    
    def operation(self, a, b, control):
        """
        control: 0000-AND, 0001-OR, 0010-ADD, 0110-SUB, 0111-SLT
        """
        if control == "0010":  # ADD
            self.result = a + b
        elif control == "0110":  # SUB
            self.result = a - b
        elif control == "0000":  # AND
            self.result = a & b
        elif control == "0001":  # OR
            self.result = a | b
        elif control == "0111":  # SLT (Set Less Than)
            self.result = 1 if a < b else 0
        
        self.zero = (self.result == 0)
        self.negative = (self.result < 0)
        return self.result
```

### 存储元件

**触发器类型**

| 类型 | 触发方式 | 特点 |
|------|----------|------|
| RS触发器 | 电平 | 基本触发器，有约束条件 |
| D触发器 | 边沿 | 数据锁存，最常用 |
| JK触发器 | 边沿 | 功能完善 |
| T触发器 | 边沿 | 计数器专用 |

**寄存器**

- 通用寄存器：临时存储操作数
- 专用寄存器：PC、IR、MAR、MDR、PSW

## 中央处理器（CPU）

### CPU 基本组成

```
┌─────────────────────────────────────┐
│           控制单元 (CU)             │
│  ┌─────────┐  ┌─────────────────┐   │
│  │ 指令寄存器 │  │    指令译码器   │   │
│  └─────────┘  └─────────────────┘   │
│  ┌─────────┐  ┌─────────────────┐   │
│  │ 程序计数器 │  │    时序发生器   │   │
│  └─────────┘  └─────────────────┘   │
└─────────────────────────────────────┘
          ↓                    ↓
┌─────────────────────────────────────┐
│          运算单元 (ALU)             │
│  ┌─────────┐  ┌─────────────────┐   │
│  │ 累加器  │  │   算术逻辑单元   │   │
│  └─────────┘  └─────────────────┘   │
└─────────────────────────────────────┘
          ↓                    ↓
┌─────────────────────────────────────┐
│           寄存器组                   │
│  ┌────┬────┬────┬────┬────┬────┐   │
│  │ R0 │ R1 │ R2 │ R3 │... │ PC │   │
│  └────┴────┴────┴────┴────┴────┘   │
└─────────────────────────────────────┘
```

### 指令周期

```
取指周期(Fetch) → 译码周期(Decode) → 执行周期(Execute) → 写回周期(Writeback)
```

```python
def instruction_cycle(cpu):
    # 1. 取指 (Fetch)
    address = cpu.pc
    instruction = cpu.memory.read(address)
    cpu.ir = instruction
    cpu.pc += 4
    
    # 2. 译码 (Decode)
    opcode = instruction[31:26]
    operands = decode(instruction)
    
    # 3. 执行 (Execute)
    if opcode == "000000":  # R型指令
        result = cpu.alu.operation(operands)
    elif opcode == "100011":  # Load
        address = operands.base + operands.offset
        result = cpu.memory.read(address)
    elif opcode == "000100":  # BEQ
        if cpu.registers[operands.rs] == cpu.registers[operands.rt]:
            cpu.pc += operands.offset * 4
    
    # 4. 写回 (Writeback)
    write_back(result)
```

### 指令格式

| 类型 | 格式 | 说明 |
|------|------|------|
| R型 | [opcode][rs][rt][rd][shamt][funct] | 寄存器操作 |
| I型 | [opcode][rs][rt][immediate] | 立即数、内存 |
| J型 | [opcode][address] | 跳转指令 |

### 寻址方式

| 方式 | 示例 | 说明 |
|------|------|------|
| 立即数寻址 | addi $t0, $t1, 100 | 操作数在指令中 |
| 寄存器寻址 | add $t0, $t1, $t2 | 操作数在寄存器 |
| 基址寻址 | lw $t0, 100($t1) | 寄存器+偏移 |
| PC相对寻址 | beq $t0, $t1, label | PC+偏移 |
| 直接寻址 | j address | 跳转地址 |

## 存储器层次结构

```
┌──────────────┐  速度最快/成本最高/容量最小
│   寄存器     │  < 1ns, 几百字节
├──────────────┤
│   高速缓存   │  1-10ns, 几MB-几十MB
├──────────────┤
│    主存      │  50-100ns, 几GB
├──────────────┤
│    磁盘      │  几ms, 几TB
└──────────────┘  速度最慢/成本最低/容量最大
```

### 缓存机制

```python
class Cache:
    def __init__(self, size, block_size, associativity):
        self.size = size
        self.block_size = block_size
        self.associativity = associativity
        self.sets = [Set() for _ in range(size // (block_size * associativity))]
    
    def read(self, address):
        tag, index, offset = self.parse_address(address)
        set = self.sets[index]
        block = set.find_block(tag)
        
        if block and block.valid:
            if block.dirty:
                self.write_back(block)  # 写回主存
            return block.data[offset]
        else:
            # Miss: 从主存加载
            block = self.memory.read_block(address)
            set.replace(tag, block)
            return block.data[offset]
```

### 局部性原理

- **时间局部性**：最近访问的项很可能再次访问
- **空间局部性**：相邻地址的项很可能被一起访问

计算机组成原理帮助我们理解程序的底层执行，是写出高效代码的基础。
