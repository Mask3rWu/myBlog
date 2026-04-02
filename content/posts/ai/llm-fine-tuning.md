---
title: LLM 微调：从理论到实践
date: 2024-03-25
excerpt: 全面介绍大语言模型的微调技术，包括 LoRA、QLoRA、RLHF 等主流方法，以及完整的微调流程和最佳实践。
tags:
  - 微调
  - LoRA
  - 深度学习
---

# 为什么需要微调

预训练的大语言模型虽然具备强大的通用能力，但在特定领域的任务上往往表现不够理想。微调（Fine-tuning）让我们能够：

1. **领域适配**：让模型更好地理解特定领域的术语和知识
2. **任务优化**：针对特定任务（如分类、摘要、对话）进行优化
3. **行为对齐**：调整模型的输出风格和响应方式
4. **知识注入**：向模型注入新的知识

## 微调的主要方法

### 1. 全参数微调（Full Fine-tuning）

更新模型的所有参数：
```python
optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)

for epoch in range(num_epochs):
    for batch in dataloader:
        outputs = model(**batch)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
```

优点：效果最好
缺点：资源消耗大，需要大量显存

### 2. LoRA（Low-Rank Adaptation）

只更新少量低秩矩阵，大幅降低训练成本：

```python
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM"
)

model = get_peft_model(base_model, lora_config)
model.print_trainable_parameters()
# trainable params: 4,194,304 || all params: 6,738,415,616 || trainable%: 0.062%
```

核心思想：
- 原始权重 W 保持冻结
- 添加两个低秩矩阵 A 和 B
- 更新公式：W' = W + BA
- 秩 r 通常选择 4-64

### 3. QLoRA

量化与 LoRA 的结合，进一步降低显存：

```python
from transformers import BitsAndBytesConfig

quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True
)

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=quantization_config
)
```

### 4. RLHF（人类反馈强化学习）

让模型学习人类偏好：

```
预训练模型 → SFT（监督微调）→ 奖励模型训练 → PPO强化学习 → 最终模型
```

步骤：
1. **SFT**：使用人类标注的数据进行监督学习
2. **奖励模型**：训练一个模型来预测人类偏好
3. **PPO**：使用强化学习优化生成策略

## 数据准备

### 数据格式

```json
{
    "instruction": "将以下中文翻译成英文",
    "input": "人工智能正在改变世界",
    "output": "Artificial intelligence is changing the world."
}
```

### 数据清洗

- 去除低质量样本
- 确保格式一致
- 平衡数据分布
- 数据增强（可选）

## 训练流程

### 1. 数据加载

```python
from datasets import load_dataset

dataset = load_dataset("json", data_files="train.json")
dataset = dataset.map(formatting_prompts_func, batched=True)
```

### 2. 训练配置

```python
from transformers import TrainingArguments

training_args = TrainingArguments(
    output_dir="./output",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    warmup_ratio=0.03,
    lr_scheduler_type="cosine",
    fp16=True,
    logging_steps=10,
    save_strategy="epoch"
)
```

### 3. 训练器

```python
from trl import SFTTrainer

trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    dataset_text_field="text",
    max_seq_length=512
)

trainer.train()
```

## 评估方法

### 1. 自动评估

```python
from evaluate import load

bleu = load("bleu")
chrf = load("chrf")
rouge = load("rouge")
```

### 2. 人工评估

- 响应质量
- 相关性
- 安全性
- 流畅性

### 3. 基准测试

- **MMLU**：多任务语言理解
- **HellaSwag**：常识推理
- **TruthfulQA**：真实性评估

## 常见问题

1. **过拟合**：增加正则化、使用更多数据
2. **灾难性遗忘**：结合预训练损失
3. **训练不稳定**：调整学习率、使用梯度裁剪
4. **推理速度慢**：模型量化、蒸馏

## 工具推荐

- **LLaMA-Factory**：低代码微调平台
- **Axolotl**：灵活的训练配置
- **DeepSpeed**：分布式训练
- **WandB**：训练可视化

微调是将通用大模型适配到特定场景的关键技术，掌握这些方法将帮助你构建更专业的 AI 应用。
