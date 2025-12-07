# 三、行为树（Behavior Tree）：AI驱动的决策引擎

### **3.1 行为树的核心架构与节点类型**

行为树通过**树状结构**和**节点组合**提供了比FSM更强大的表达能力，特别适合复杂决策逻辑

```tsx

// 行为树基础节点类型
enum NodeStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE', 
  RUNNING = 'RUNNING'
}

abstract class BehaviorTreeNode {
  abstract tick(blackboard: Blackboard): NodeStatus;

  // 工具方法
  protected log(message: string) {
    console.log(`[${this.constructor.name}] ${message}`);
  }
}

// 黑板数据共享机制
class Blackboard {
  private data: Map<string, any> = new Map();
  private observers: Map<string, Array<(value: any) => void>> = new Map();

  set<T>(key: string, value: T): void {
    const oldValue = this.data.get(key);
    this.data.set(key, value);

    // 通知观察者
    if (this.observers.has(key)) {
      this.observers.get(key)!.forEach(callback => callback(value));
    }

    // 值变化通知
    if (oldValue !== value) {
      this.emit(`change:${key}`, value, oldValue);
    }
  }

  get<T>(key: string, defaultValue?: T): T {
    return this.data.has(key) ? this.data.get(key) : defaultValue;
  }

  observe<T>(key: string, callback: (value: T) => void): () => void {
    if (!this.observers.has(key)) {
      this.observers.set(key, []);
    }
    this.observers.get(key)!.push(callback);

    // 返回取消观察函数
    return () => {
      const callbacks = this.observers.get(key) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  private events: Map<string, Array<Function>> = new Map();

  on(event: string, callback: Function): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  private emit(event: string, ...args: any[]): void {
    const callbacks = this.events.get(event) || [];
    callbacks.forEach(callback => callback(...args));
  }
}
```

### **3.2 复合节点：控制流的核心**

```tsx

// 选择器节点：OR逻辑，直到一个子节点成功
class SelectorNode extends BehaviorTreeNode {
  constructor(private children: BehaviorTreeNode[]) {
    super();
  }

  tick(blackboard: Blackboard): NodeStatus {
    for (const child of this.children) {
      const status = child.tick(blackboard);
      if (status !== NodeStatus.FAILURE) {
        return status;
      }
    }
    return NodeStatus.FAILURE;
  }
}

// 序列节点：AND逻辑，所有子节点必须成功
class SequenceNode extends BehaviorTreeNode {
  constructor(private children: BehaviorTreeNode[]) {
    super();
  }

  tick(blackboard: Blackboard): NodeStatus {
    for (const child of this.children) {
      const status = child.tick(blackboard);
      if (status !== NodeStatus.SUCCESS) {
        return status;
      }
    }
    return NodeStatus.SUCCESS;
  }
}

// 并行节点：同时执行所有子节点
class ParallelNode extends BehaviorTreeNode {
  constructor(
    private children: BehaviorTreeNode[],
    private successThreshold: number = children.length, // 成功阈值
    private failureThreshold: number = 1 // 失败阈值
  ) {
    super();
  }

  tick(blackboard: Blackboard): NodeStatus {
    let successCount = 0;
    let failureCount = 0;

    for (const child of this.children) {
      const status = child.tick(blackboard);
      if (status === NodeStatus.SUCCESS) successCount++;
      if (status === NodeStatus.FAILURE) failureCount++;
    }

    if (successCount >= this.successThreshold) {
      return NodeStatus.SUCCESS;
    }

    if (failureCount >= this.failureThreshold) {
      return NodeStatus.FAILURE;
    }

    return NodeStatus.RUNNING;
  }
}

// 装饰器节点：修改子节点行为
class InverterNode extends BehaviorTreeNode {
  constructor(private child: BehaviorTreeNode) {
    super();
  }

  tick(blackboard: Blackboard): NodeStatus {
    const status = this.child.tick(blackboard);

    switch (status) {
      case NodeStatus.SUCCESS:
        return NodeStatus.FAILURE;
      case NodeStatus.FAILURE:
        return NodeStatus.SUCCESS;
      default:
        return status;
    }
  }
}

// 重复节点
class RepeaterNode extends BehaviorTreeNode {
  constructor(
    private child: BehaviorTreeNode,
    private times: number = -1 // -1 表示无限重复
  ) {
    super();
  }

  tick(blackboard: Blackboard): NodeStatus {
    let count = 0;

    while (this.times === -1 || count < this.times) {
      const status = this.child.tick(blackboard);

      if (status === NodeStatus.RUNNING) {
        return NodeStatus.RUNNING;
      }

      count++;

      // 如果子节点失败，我们也失败
      if (status === NodeStatus.FAILURE) {
        return NodeStatus.FAILURE;
      }
    }

    return NodeStatus.SUCCESS;
  }
}
```

### **3.3 叶子节点：具体行为的执行者**

```tsx

// 条件节点
class ConditionNode extends BehaviorTreeNode {
  constructor(
    private condition: (blackboard: Blackboard) => boolean,
    private description?: string
  ) {
    super();
  }

  tick(blackboard: Blackboard): NodeStatus {
    const result = this.condition(blackboard);
    this.log(`条件检查: ${this.description} -> ${result}`);
    return result ? NodeStatus.SUCCESS : NodeStatus.FAILURE;
  }
}

// 动作节点
class ActionNode extends BehaviorTreeNode {
  constructor(
    private action: (blackboard: Blackboard) => Promise<NodeStatus> | NodeStatus,
    private description?: string
  ) {
    super();
  }

  async tick(blackboard: Blackboard): Promise<NodeStatus> {
    this.log(`执行动作: ${this.description}`);

    try {
      const result = await this.action(blackboard);
      this.log(`动作完成: ${this.description} -> ${result}`);
      return result;
    } catch (error) {
      this.log(`动作失败: ${this.description} -> ${error}`);
      return NodeStatus.FAILURE;
    }
  }
}

// 等待节点
class WaitNode extends BehaviorTreeNode {
  private startTime: number | null = null;

  constructor(private duration: number) {
    super();
  }

  tick(blackboard: Blackboard): NodeStatus {
    if (this.startTime === null) {
      this.startTime = Date.now();
    }

    const elapsed = Date.now() - this.startTime;

    if (elapsed >= this.duration) {
      this.startTime = null; // 重置以供下次使用
      return NodeStatus.SUCCESS;
    }

    return NodeStatus.RUNNING;
  }
}
```