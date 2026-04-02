---
title: Transformer 架构深度解析
date: 2024-03-15
excerpt: 从注意力机制到Transformer的完整技术解析，包括多头注意力、位置编码、模型训练等核心概念的深入讲解。
tags:
  - Transformer
  - 深度学习
  - 注意力机制
---

# Transformer 架构概述

Transformer 是现代大语言模型的基石，由谷歌在 2017 年的论文《Attention Is All You Need》中首次提出。

## 整体架构

```
输入 → 嵌入层 → 位置编码 → 编码器/解码器堆叠 → 输出
```

核心组件：
1. **嵌入层（Embedding）**：将 token 转换为向量
2. **位置编码（Positional Encoding）**：注入序列位置信息
3. **编码器/解码器**：多层堆叠的自注意力网络

## 注意力机制（Attention）

### Scaled Dot-Product Attention

```python
def attention(Q, K, V):
    d_k = K.shape[-1]
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V)
```

三个关键矩阵：
- **Q（Query）**：查询向量，表示当前位置想要关注什么
- **K（Key）**：键向量，表示每个位置能提供什么信息
- **V（Value）**：值向量，实际包含的信息内容

### 多头注意力（Multi-Head Attention）

```
Q, K, V → 线性投影 → 分头 → 分别计算注意力 → 拼接 → 线性输出
```

多头的好处：
- 捕获多种不同的关联模式
- 不同的注意力头关注不同类型的关系
- 增强模型的表达能力

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
```

## 位置编码（Positional Encoding）

Transformer 本身不包含循环结构，需要额外注入位置信息：

### 三角函数编码

```python
def positional_encoding(seq_len, d_model):
    PE = torch.zeros(seq_len, d_model)
    position = torch.arange(0, seq_len).unsqueeze(1)
    div_term = torch.exp(torch.arange(0, d_model, 2) * (-math.log(10000.0) / d_model))
    
    PE[:, 0::2] = torch.sin(position * div_term)
    PE[:, 1::2] = torch.cos(position * div_term)
    return PE
```

### 旋转位置编码（RoPE）

Llama 等现代模型使用的位置编码方式：
- 通过旋转操作注入位置信息
- 支持更长的上下文
- 计算效率更高

## 前馈神经网络（FFN）

每个 Transformer 层都包含一个前馈网络：

```python
class FeedForward(nn.Module):
    def __init__(self, d_model, d_ff):
        super().__init__()
        self.linear1 = nn.Linear(d_model, d_ff)
        self.activation = nn.GELU()
        self.linear2 = nn.Linear(d_ff, d_model)
```

典型配置：
- 中间维度通常是模型维度的 4 倍
- 使用 GELU 激活函数替代 ReLU
- 包含残差连接和层归一化

## 层归一化和残差连接

```python
class TransformerLayer(nn.Module):
    def __init__(self):
        super().__init__()
        self.attention = MultiHeadAttention(...)
        self.norm1 = nn.LayerNorm(d_model)
        self.ffn = FeedForward(...)
        self.norm2 = nn.LayerNorm(d_model)
    
    def forward(self, x):
        x = x + self.attention(self.norm1(x))
        x = x + self.ffn(self.norm2(x))
        return x
```

## 训练技巧

### 1. 混合精度训练
```python
scaler = GradScaler()
with autocast():
    outputs = model(inputs)
loss = criterion(outputs, targets)
scaler.scale(loss).backward()
```

### 2. 梯度累积
突破显存限制，实现更大的 batch size

### 3. 学习率调度
```python
scheduler = get_cosine_schedule_with_warmup(
    optimizer,
    num_warmup_steps=2000,
    num_training_steps=100000
)
```

### 4. 梯度裁剪
```python
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
```

## Transformer 的演进

1. **Vanilla Transformer**：编码器-解码器架构
2. **BERT**：仅编码器架构，双向理解
3. **GPT 系列**：仅解码器架构，自回归生成
4. **T5**：编码器-解码器统一框架
5. **LLaMA**：高效的开源实现

理解 Transformer 架构是掌握现代 AI 模型的基础，对于从事 AI 研发的工程师至关重要。
