# 行为树 (Behavior Tree) 系统说明

## 🌳 什么是行为树？

**行为树 (Behavior Tree)** 是一种用于AI决策的树形结构，比简单的决策树更强大和灵活。它被广泛应用于游戏AI开发中。

### 决策树 vs 行为树

| 特性         | 决策树                   | 行为树                         |
| ------------ | ------------------------ | ------------------------------ |
| **结构**     | 二叉树（true/false分支） | N叉树（多个子节点）            |
| **节点类型** | 条件 + 动作              | 组合节点 + 装饰节点 + 叶子节点 |
| **执行方式** | 一次性遍历到底           | 可中断、可继续 (RUNNING状态)   |
| **复用性**   | 低（嵌套结构难以复用）   | 高（子树可以独立复用）         |
| **适用场景** | 简单验证逻辑             | 复杂AI行为决策                 |

## 🎯 行为树核心概念

### 节点状态 (Node Status)

每个节点执行后返回三种状态之一：

```typescript
enum NodeStatus {
  SUCCESS = "SUCCESS", // ✅ 成功
  FAILURE = "FAILURE", // ❌ 失败
  RUNNING = "RUNNING", // ⏳ 运行中（异步操作）
}
```

### 节点类型

#### 1. 组合节点 (Composite Nodes)

有多个子节点，控制子节点的执行顺序和逻辑：

##### **Sequence Node (序列节点)**

- **逻辑**: 按顺序执行子节点，所有成功才成功
- **类似**: 逻辑 AND (`&&`)
- **返回**:
  - ✅ SUCCESS: 所有子节点都成功
  - ❌ FAILURE: 任何一个子节点失败
  - ⏳ RUNNING: 有子节点正在执行

```typescript
// 示例：施放技能需要所有条件都满足
new SequenceNode([
  checkGCD(), // 检查GCD
  checkCooldown(), // 检查技能CD
  checkEnergy(), // 检查能量
  checkTarget(), // 检查目标
  executeSkill(), // 执行技能
]);
```

##### **Selector Node (选择节点)**

- **逻辑**: 按顺序尝试子节点，一个成功就成功
- **类似**: 逻辑 OR (`||`)
- **返回**:
  - ✅ SUCCESS: 任何一个子节点成功
  - ❌ FAILURE: 所有子节点都失败
  - ⏳ RUNNING: 有子节点正在执行

```typescript
// 示例：尝试多种攻击方式
new SelectorNode([
  tryHeavyStrike(), // 先尝试重击
  tryAttack(), // 重击不行就普通攻击
  tryRangedAttack(), // 都不行就远程攻击
]);
```

#### 2. 装饰节点 (Decorator Nodes)

修改单个子节点的行为：

##### **Inverter Node (反转节点)**

- **功能**: 反转子节点的结果
- **返回**:
  - SUCCESS → FAILURE
  - FAILURE → SUCCESS
  - RUNNING → RUNNING

```typescript
// 示例：检查目标是否不在范围内
new InverterNode(new ConditionNode(() => isInRange()));
```

#### 3. 叶子节点 (Leaf Nodes)

没有子节点，执行具体的逻辑：

##### **Condition Node (条件节点)**

- **功能**: 检查一个条件
- **返回**: SUCCESS 或 FAILURE

```typescript
new ConditionNode(
  () => player.energy >= 50,
  "Not enough energy", // 失败时的错误消息
);
```

##### **Action Node (动作节点)**

- **功能**: 执行一个动作
- **返回**: 通常是 SUCCESS（除非出错）

```typescript
new ActionNode(
  () => player.attack(),
  "Attacking target", // 动作描述
);
```

## 🎮 本项目中的应用

### 玩家技能系统的行为树

使用 **Sequence Node** 来验证技能释放的所有前置条件：

```typescript
new BehaviorTree(
  new SequenceNode([
    // 条件1: GCD准备好了吗？
    new ConditionNode(
      () => this.globalCooldown === 0,
      "Global cooldown active",
    ),

    // 条件2: 技能CD好了吗？
    new ConditionNode(() => skill.currentCooldown === 0, "Skill on cooldown"),

    // 条件3: 有足够能量吗？
    new ConditionNode(
      () => this.player.currentEnergy >= skill.energyCost,
      "Not enough energy",
    ),

    // 条件4: 有有效目标吗？
    new ConditionNode(
      () => this.player.target && !this.player.target.isDead,
      "No valid target",
    ),

    // 条件5: 目标在范围内吗？
    new ConditionNode(
      () => this.player.distanceTo(this.player.target!) <= skill.range,
      "Target out of range",
    ),

    // 动作: 执行技能
    new ActionNode(() => this.executeSkill(skill), "Executing skill"),
  ]),
);
```

### 执行流程

```
开始
  ↓
检查GCD → ✅ 通过
  ↓
检查CD → ✅ 通过
  ↓
检查能量 → ✅ 通过
  ↓
检查目标 → ❌ 失败 → 整个序列失败
  ↓
❌ 返回 FAILURE，显示错误消息
```

## 🆚 为什么行为树比决策树更好？

### 1. **更清晰的结构**

**决策树** (旧代码):

```typescript
DecisionTree.createCondition(
  () => checkA(),
  DecisionTree.createCondition(
    () => checkB(),
    DecisionTree.createCondition(
      () => checkC(),
      DecisionTree.createAction(() => execute()),
    ),
  ),
);
// 😵 嵌套地狱！
```

**行为树** (新代码):

```typescript
new SequenceNode([
  new ConditionNode(() => checkA()),
  new ConditionNode(() => checkB()),
  new ConditionNode(() => checkC()),
  new ActionNode(() => execute()),
]);
// 😊 平铺直观！
```

### 2. **更灵活的组合**

```typescript
// 复杂逻辑示例：先尝试近战，不行就远程
new SelectorNode([
  // 选项1：近战序列
  new SequenceNode([
    new ConditionNode(() => isInMeleeRange()),
    new ActionNode(() => meleeAttack()),
  ]),

  // 选项2：远程序列
  new SequenceNode([
    new ConditionNode(() => hasAmmo()),
    new ActionNode(() => rangedAttack()),
  ]),
]);
```

### 3. **可复用的子树**

```typescript
// 定义一个可复用的"攻击前检查"子树
const preAttackChecks = new SequenceNode([
  new ConditionNode(() => hasTarget()),
  new ConditionNode(() => hasEnergy()),
  new ConditionNode(() => isInRange()),
]);

// 在多个技能中复用
const heavyAttack = new SequenceNode([
  preAttackChecks, // 复用！
  new ActionNode(() => doHeavyAttack()),
]);

const quickAttack = new SequenceNode([
  preAttackChecks, // 复用！
  new ActionNode(() => doQuickAttack()),
]);
```

### 4. **支持异步操作**

```typescript
// RUNNING 状态支持异步操作
class AsyncActionNode extends BehaviorNode {
  private isComplete = false;

  tick(): NodeStatus {
    if (!this.isComplete) {
      // 异步操作进行中
      this.doAsyncWork();
      return NodeStatus.RUNNING; // ⏳ 下次继续执行
    }
    return NodeStatus.SUCCESS; // ✅ 完成
  }
}
```

## 📚 扩展示例

### 怪物AI使用行为树

虽然当前怪物使用FSM，但也可以用行为树实现：

```typescript
// 怪物AI行为树
const monsterAI = new SelectorNode([
  // 选项1：攻击序列
  new SequenceNode([
    new ConditionNode(() => hasTarget()),
    new ConditionNode(() => isInAttackRange()),
    new ActionNode(() => attack()),
  ]),

  // 选项2：追逐序列
  new SequenceNode([
    new ConditionNode(() => hasTarget()),
    new ConditionNode(() => isInChaseRange()),
    new ActionNode(() => moveToTarget()),
  ]),

  // 选项3：巡逻（默认行为）
  new ActionNode(() => patrol()),
]);
```

### 更复杂的玩家决策

```typescript
// 自动战斗逻辑
const autoCombat = new SelectorNode([
  // 优先级1：血量低于30%时治疗
  new SequenceNode([
    new ConditionNode(() => player.health < 30),
    new ActionNode(() => useHeal()),
  ]),

  // 优先级2：使用大招
  new SequenceNode([
    new ConditionNode(() => heavyStrike.isReady()),
    new ConditionNode(() => hasTarget()),
    new ActionNode(() => useHeavyStrike()),
  ]),

  // 优先级3：普通攻击
  new SequenceNode([
    new ConditionNode(() => hasTarget()),
    new ActionNode(() => useAttack()),
  ]),
]);
```

## 🎓 学习资源

- **本项目实现**: `src/core/BehaviorTree.ts`
- **使用示例**: `src/systems/SkillManager.ts`
- **经典文章**: [Behavior Trees in Game AI](<https://en.wikipedia.org/wiki/Behavior_tree_(artificial_intelligence,_robotics_and_control)>)

## 💡 总结

| 特性         | 优势                      |
| ------------ | ------------------------- |
| **模块化**   | 节点可以独立开发和测试    |
| **可复用**   | 子树可以在多处使用        |
| **可读性**   | 树形结构直观易懂          |
| **灵活性**   | 支持复杂的组合逻辑        |
| **可扩展**   | 容易添加新的节点类型      |
| **异步支持** | RUNNING状态支持长时间操作 |

行为树是现代游戏AI的标准工具，掌握它对游戏开发非常重要！🎮✨
