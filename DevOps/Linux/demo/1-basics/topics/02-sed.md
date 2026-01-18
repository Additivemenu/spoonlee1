这个问题问得**非常到位** 👍
一句话先给结论：

> **`sed` = Linux 世界里“最轻量、最快速的批量文本手术刀”**

它不是用来写程序的，是用来 **“在文本流上做规则化、自动化处理”** 的。

下面我按 **你真正会用到的能力层级** 来讲，而不是 man page 那一套。

---

# 一、sed 能做什么（能力总览）

| 能力        | 常见用途                  |
| --------- | --------------------- |
| 行选择 / 过滤  | 按行号、关键字、范围抽取          |
| 删除        | 删注释、删空行、删区块           |
| 替换        | 批量改配置、SQL、日志          |
| 插入 / 追加   | 加 header、加标记          |
| 区块操作      | 处理 SQL / config block |
| 重排 / 简单变形 | 改格式、前后缀               |
| 流式处理      | 不加载整个文件，快             |

---

# 二、你**最常用的 6 大类操作**

## 1️⃣ 行选择（filter / extract）

### 按行号

```bash
sed -n '1,10p' file.txt     # 前 10 行
sed -n '10p' file.txt      # 第 10 行
```

### 按关键字

```bash
sed -n '/ERROR/p' app.log
```

### 按范围（你刚问的那种）

```bash
sed -n '/START/,/END/p' file
```

---

## 2️⃣ 删除（delete）

### 删除空行

```bash
sed '/^$/d' file
```

### 删除注释

```bash
sed '/^#/d' config.conf
```

### 删除某个区块

```bash
sed '/BEGIN/,/END/d' file
```

👉 **这是 DBA / 运维天天在用的**

---

## 3️⃣ 替换（sed 最强技能）

### 基本替换

```bash
sed 's/foo/bar/' file
```

### 全行替换

```bash
sed 's/foo/bar/g' file
```

### 原地修改文件（⚠️ 慎用）

```bash
sed -i 's/old/new/g' file
```

### 用正则

```bash
sed 's/[0-9]\+/NUM/g' file
```

---

## 4️⃣ 插入 / 追加

### 行前插入

```bash
sed '1i\HEADER' file
```

### 行后追加

```bash
sed '$a\FOOTER' file
```

### 匹配后追加

```bash
sed '/ERROR/a\----' log.txt
```

---

## 5️⃣ 区块级操作（进阶但非常实用）

### 修改某一段里的内容

```bash
sed '/BEGIN/,/END/ s/foo/bar/g' file
```

### 删除区块中的某些行

```bash
sed '/BEGIN/,/END/ {
  /debug/d
}' file
```

👉 你之前切 MySQL dump 就是这个级别

---

## 6️⃣ 重排 / 轻量格式化

### 给每行加前缀

```bash
sed 's/^/[INFO] /' log.txt
```

### 给每行加后缀

```bash
sed 's/$/;/' sql.txt
```

### 合并简单结构

```bash
sed 'N;s/\n/ /' file
```

---

# 三、sed 的“思维模型”（理解这个就够了）

### sed 的执行逻辑是：

```
读一行 → 放进 pattern space → 执行命令 → 输出 → 下一行
```

所以它：

* ❌ 不擅长复杂状态
* ✅ 非常擅长“规则明确的文本修改”

---

# 四、什么时候该用 sed？什么时候不该用？

## ✅ 适合 sed

* 配置文件
* SQL dump
* 日志
* 批量替换
* CI / shell 脚本

## ❌ 不适合 sed

* 需要复杂逻辑（if / loop / state）
* 需要解析嵌套结构（JSON / XML）
* 需要跨多行记忆状态（awk / python 更好）

---

# 五、sed vs awk vs grep（一眼看懂）

| 工具     | 定位      |
| ------ | ------- |
| `grep` | 找       |
| `sed`  | 改       |
| `awk`  | 算 / 结构化 |

口诀：

> **grep 找，sed 改，awk 算**

---

# 六、你现在这个阶段的“必会 sed 清单”

如果你是 **后端 / infra / 数据库** 路线：

✔ 行范围
✔ `s///g`
✔ `/start/,/end/`
✔ `-n + p`
✔ `-i`（知道危险就够）

---

## 一句话工程师总结

> **sed 就是：用最少的语法，对大文本做最确定、可重复的修改。**

如果你愿意，我可以下一步给你：

* **10 条 DBA / 后端常用 sed 模板**
* **sed → awk 迁移思维**
* **真实项目里的 sed 一行命令拆解**

你已经问到“会不会 shell”的分水岭了 👌
