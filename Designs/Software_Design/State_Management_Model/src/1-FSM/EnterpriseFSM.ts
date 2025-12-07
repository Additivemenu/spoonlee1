// 类型安全的FSM实现
interface FSMConfig<
  TState extends string,
  TEvent extends string,
  TContext = any,
> {
  id: string;
  initial: TState;
  states: Record<
    TState,
    {
      on?: Partial<
        Record<
          TEvent,
          {
            target: TState;
            action?: (context: TContext) => void;
            guard?: (context: TContext) => boolean;
          }
        >
      >;
      entry?: (context: TContext) => void;
      exit?: (context: TContext) => void;
    }
  >;
  /**
   * 状态机的共享上下文数据
   * @description 存储状态机相关的业务数据，在整个状态机生命周期中共享
   *              - 可在 guard 函数中访问，用于条件判断
   *              - 可在 action 函数中访问和修改
   *              - 可在 entry/exit 钩子中访问
   *              - 通过 send 方法的 payload 参数动态更新
   *              - 传递给所有监听器
   * 这种设计的好处是：
   *  ✅ 数据集中管理 - 所有状态相关数据在一个地方
   *  ✅ 解耦状态和数据 - 状态转移逻辑和业务数据分离
   *  ✅ 灵活的条件判断 - guard 可以基于业务数据决定是否允许转移
   *  ✅ 便于调试和追踪 - context 的变化可以被监听和记录
   *
   * @example
   * ```ts
   * context: {
   *   documentId: "doc-123",
   *   version: 1,
   *   changes: []
   * }
   * ```
   */
  context?: TContext;
}

class EnterpriseFSM<
  TState extends string,
  TEvent extends string,
  TContext = any,
> {
  private currentState: TState;
  /**
   * 状态机的共享上下文 - 存储业务相关数据
   * @description 类似于 Redux 的 state 或 React 组件的 state
   *              在所有 guard、action、entry、exit 函数中都可以访问
   *              通过 send 方法的 payload 可以动态更新此上下文
   */
  private context: TContext;
  private readonly config: FSMConfig<TState, TEvent, TContext>;
  private stateHistory: Array<{
    state: TState;
    timestamp: number;
    event?: TEvent;
  }> = [];

  // 状态转移监听器 - array of functions
  private listeners: Array<
    (transition: {
      from: TState;
      to: TState;
      event: TEvent;
      context: TContext;
    }) => void
  > = [];

  constructor(config: FSMConfig<TState, TEvent, TContext>) {
    this.config = config;
    this.currentState = config.initial;
    this.context = (config.context || {}) as TContext;
    this.recordState("INIT");
  }

  /**
   * 发送事件触发状态转移
   * @param event - 要触发的事件类型
   * @param payload - 可选的附加数据，会合并到上下文中
   * @returns Promise<boolean> - 状态转移是否成功执行
   * @description 这是FSM的核心方法，负责处理状态转移的完整生命周期：
   *              1. 验证转移是否定义
   *              2. 检查守卫条件（guard）
   *              3. 执行源状态的exit动作
   *              4. 执行转移动作（action）
   *              5. 更新当前状态
   *              6. 执行目标状态的entry动作
   *              7. 记录状态历史
   *              8. 通知所有监听器
   * @example
   * ```ts
   * const success = await fsm.send('SUBMIT', { author: 'John' });
   * if (success) {
   *   console.log('状态转移成功');
   * }
   * ```
   */
  async send(event: TEvent, payload?: any): Promise<boolean> {
    // 获取当前状态的配置
    const currentStateConfig = this.config.states[this.currentState];
    // 查找对应事件的转移配置
    const transitionConfig = currentStateConfig.on?.[event];

    // 1. 验证转移是否定义
    if (!transitionConfig) {
      console.warn(`无定义转移: ${this.currentState} -> ${event}`);
      return false;
    }

    // 2. 执行守卫条件检查 - 如果守卫返回false，阻止状态转移
    if (transitionConfig.guard && !transitionConfig.guard(this.context)) {
      console.warn(`守卫条件阻止转移: ${this.currentState} -> ${event}`);
      return false;
    }

    const fromState = this.currentState;

    //! 3. 执行源状态的exit动作钩子
    await this.executeStateAction("exit", fromState);

    //! 4. 执行转移动作 - 合并payload到上下文
    if (transitionConfig.action) {
      await transitionConfig.action({ ...this.context, ...payload });
    }

    // 5. 更新状态到目标状态
    this.currentState = transitionConfig.target;

    //! 6. 执行目标状态的entry动作钩子
    await this.executeStateAction("entry", this.currentState);

    // 7. 记录状态历史（用于调试和时间旅行）
    this.recordState(event);

    // 8. 通知所有监听器状态已变化
    this.notifyListeners({
      from: fromState,
      to: this.currentState,
      event,
      context: this.context,
    });

    return true;
  }

  /**
   * 执行状态的进入或退出动作
   * @param type - 动作类型: "entry" (进入) 或 "exit" (退出)
   * @param state - 目标状态
   * @description 在状态转移过程中自动调用，用于执行状态的生命周期钩子函数
   */
  private async executeStateAction(type: "entry" | "exit", state: TState) {
    const action = this.config.states[state]?.[type];
    if (action) {
      await action(this.context);
    }
  }

  /**
   * 记录状态历史
   * @param event - 触发状态变化的事件 (可选)
   * @description 将当前状态、时间戳和触发事件添加到历史记录中
   *              自动维护历史记录大小，超过1000条时保留最近的500条
   *              用于调试、审计和时间旅行功能
   */
  private recordState(event?: TEvent | "INIT") {
    this.stateHistory.push({
      state: this.currentState,
      timestamp: Date.now(),
      event: event as TEvent | undefined,
    });

    // 保持历史记录在合理范围内
    if (this.stateHistory.length > 1000) {
      this.stateHistory = this.stateHistory.slice(-500);
    }
  }

  /**
   * 通知所有已注册的监听器
   * @param transition - 状态转移信息对象
   * @param transition.from - 源状态
   * @param transition.to - 目标状态
   * @param transition.event - 触发事件
   * @param transition.context - 当前上下文
   * @description 在状态转移完成后调用，向所有监听器广播状态变化
   *              用于实现观察者模式，允许外部代码响应状态变化
   */
  private notifyListeners(transition: {
    from: TState;
    to: TState;
    event: TEvent | "TIME_TRAVEL";
    context: TContext;
  }) {
    this.listeners.forEach((listener) => {
      listener(transition as any);
    });
  }

  // 时间旅行调试
  timeTravelTo(index: number) {
    if (index >= 0 && index < this.stateHistory.length) {
      const targetState = this.stateHistory[index];
      this.currentState = targetState.state;

      this.notifyListeners({
        from: this.currentState,
        to: targetState.state,
        event: "TIME_TRAVEL" as TEvent,
        context: this.context,
      });
    }
  }

  /**
   * 获取可达性分析
   * @returns 从当前状态出发可以到达的所有状态集合
   * @description 使用广度优先搜索(BFS)算法，从当前状态开始，遍历所有可能的状态转移路径
   *              计算出所有可以通过一系列事件到达的状态集合
   *              这对于验证状态机的完整性、检测死锁状态、以及可视化状态图非常有用
   * @example
   * ```ts
   * const reachableStates = fsm.getReachableStates();
   * console.log(reachableStates); // Set { 'draft', 'editing', 'reviewing', ... }
   * ```
   */
  getReachableStates(): Set<TState> {
    // 用于记录已访问的状态，避免重复访问和无限循环
    const visited = new Set<TState>();
    // BFS队列，初始化为当前状态
    const queue: TState[] = [this.currentState];

    // 广度优先搜索遍历所有可达状态
    while (queue.length > 0) {
      const state = queue.shift()!;
      // 跳过已访问的状态
      if (visited.has(state)) continue;

      visited.add(state);
      const stateConfig = this.config.states[state];

      // 遍历该状态的所有可能转移
      if (stateConfig.on) {
        Object.values(stateConfig.on).forEach((transition) => {
          if (
            transition &&
            typeof transition === "object" &&
            "target" in transition
          ) {
            const target = transition.target as TState;
            // 将未访问的目标状态加入队列
            if (!visited.has(target)) {
              queue.push(target);
            }
          }
        });
      }
    }

    return visited;
  }
}
