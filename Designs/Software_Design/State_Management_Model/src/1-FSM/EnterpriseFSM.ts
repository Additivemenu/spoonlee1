// 类型安全的FSM实现
interface FSMConfig<TState extends string, TEvent extends string> {
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
            action?: (context: any) => void;
            guard?: (context: any) => boolean;
          }
        >
      >;
      entry?: (context: any) => void;
      exit?: (context: any) => void;
    }
  >;
  context?: any;
}

class EnterpriseFSM<TState extends string, TEvent extends string> {
  private currentState: TState;
  private context: any;
  private readonly config: FSMConfig<TState, TEvent>;
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
      context: any;
    }) => void
  > = [];

  constructor(config: FSMConfig<TState, TEvent>) {
    this.config = config;
    this.currentState = config.initial;
    this.context = config.context || {};
    this.recordState("INIT");
  }

  //! 发送事件触发状态转移
  async send(event: TEvent, payload?: any): Promise<boolean> {
    const currentStateConfig = this.config.states[this.currentState];
    const transitionConfig = currentStateConfig.on?.[event];

    if (!transitionConfig) {
      console.warn(`无定义转移: ${this.currentState} -> ${event}`);
      return false;
    }

    // 执行守卫条件检查
    if (transitionConfig.guard && !transitionConfig.guard(this.context)) {
      console.warn(`守卫条件阻止转移: ${this.currentState} -> ${event}`);
      return false;
    }

    const fromState = this.currentState;

    // 执行退出动作
    await this.executeStateAction("exit", fromState);

    // 执行转移动作
    if (transitionConfig.action) {
      await transitionConfig.action({ ...this.context, ...payload });
    }

    // 更新状态
    this.currentState = transitionConfig.target;

    // 执行进入动作
    await this.executeStateAction("entry", this.currentState);

    // 额外: 记录状态历史
    this.recordState(event);

    // 额外: 通知监听器
    this.notifyListeners({
      from: fromState,
      to: this.currentState,
      event,
      context: this.context,
    });

    return true;
  }

  private async executeStateAction(type: "entry" | "exit", state: TState) {
    const action = this.config.states[state]?.[type];
    if (action) {
      await action(this.context);
    }
  }

  private recordState(event?: TEvent) {
    this.stateHistory.push({
      state: this.currentState,
      timestamp: Date.now(),
      event,
    });

    // 保持历史记录在合理范围内
    if (this.stateHistory.length > 1000) {
      this.stateHistory = this.stateHistory.slice(-500);
    }
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

  // 获取可达性分析
  getReachableStates(): Set<TState> {
    const visited = new Set<TState>();
    const queue: TState[] = [this.currentState];

    while (queue.length > 0) {
      const state = queue.shift()!;
      if (visited.has(state)) continue;

      visited.add(state);
      const stateConfig = this.config.states[state];

      if (stateConfig.on) {
        Object.values(stateConfig.on).forEach((transition) => {
          if (!visited.has(transition.target)) {
            queue.push(transition.target);
          }
        });
      }
    }

    return visited;
  }
}
