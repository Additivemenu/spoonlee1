// 分层状态机实现

/**
 * 转移配置
 */
interface TransitionConfig {
  target: string; // 目标状态路径
  action?: (context: any) => void;
  guard?: (context: any) => boolean;
}

/**
 * HFSM 状态定义（支持递归嵌套）
 */
interface HFSMState {
  initial?: string; // 复合状态的初始子状态
  states?: Record<string, HFSMState>; // 子状态定义
  on?: Record<string, TransitionConfig | string>; // 支持简写（字符串表示只有 target）
  entry?: (context: any) => void; // 进入状态时执行
  exit?: (context: any) => void; // 退出状态时执行
}

/**
 * HFSM 配置接口
 */
interface HFSMConfig {
  initial: string; // 初始状态路径
  states: Record<string, HFSMState>; // 根状态定义
  context?: any; // 共享上下文
}

// FSM 本身也是可以nested的, 所以需要递归定义
class HierarchicalFSM {
  protected config: HFSMConfig;
  protected context: any;
  private currentStatePath: string[] = [];
  private stateStack: Array<{
    state: string;
    history?: string; // 历史状态记录
  }> = [];

  constructor(config: HFSMConfig) {
    this.config = config;
    this.context = config.context || {};
    // 初始化：进入初始状态
    this.enterState(config.initial);
  }

  /**
   * 解析状态路径 'parent.child.grandchild'
   * @returns 状态配置对象和路径数组
   */
  protected resolveStatePath(statePath: string): {
    state: HFSMState;
    path: string[];
  } {
    const path = statePath.split(".");
    let current: any = this.config;

    // 遍历路径，逐层查找状态
    for (let i = 0; i < path.length; i++) {
      const segment = path[i];

      if (!current.states || !current.states[segment]) {
        throw new Error(`状态路径不存在: ${statePath} (在 ${segment} 处)`);
      }

      current = current.states[segment];
    }

    return { state: current as HFSMState, path };
  }

  /**
   * 退出当前状态（从最深的子状态开始，依次退出到根状态）
   */
  protected exitCurrentState(): void {
    // 从最深层的子状态开始，依次执行 exit 钩子
    for (let i = this.currentStatePath.length - 1; i >= 0; i--) {
      const path = this.currentStatePath.slice(0, i + 1).join(".");

      try {
        const { state } = this.resolveStatePath(path);
        if (state.exit) {
          state.exit(this.context);
        }
      } catch (e) {
        // 状态路径可能无效，跳过
        console.warn(`退出状态失败: ${path}`, e);
      }
    }
  }

  /**
   * 进入分层状态
   */
  protected enterState(statePath: string): void {
    const { path } = this.resolveStatePath(statePath);

    // 退出当前状态
    this.exitCurrentState();

    // 进入新状态及其所有父状态
    let currentPath = "";
    for (let i = 0; i < path.length; i++) {
      currentPath = i === 0 ? path[i] : `${currentPath}.${path[i]}`;

      const stateConfig = this.resolveStatePath(currentPath).state;

      // 执行进入动作
      if (stateConfig.entry) {
        stateConfig.entry(this.context);
      }

      // 如果是复合状态且有初始状态，进入初始子状态
      if (stateConfig.states && stateConfig.initial) {
        const childPath = `${currentPath}.${stateConfig.initial}`;
        this.enterState(childPath);
        break;
      }
    }

    this.currentStatePath = path;
  }

  /**
   * 处理分层事件传播（事件冒泡）
   * @description 从当前状态开始，向上冒泡处理事件，直到找到能处理该事件的状态
   */
  protected handleEvent(event: string, payload?: any): boolean {
    // 从当前状态开始，向上冒泡处理事件
    let currentPath = this.currentStatePath.join(".");

    while (currentPath) {
      const stateConfig = this.resolveStatePath(currentPath).state;

      if (stateConfig.on?.[event]) {
        let transition = stateConfig.on[event];

        // 支持简写：字符串直接表示目标状态
        if (typeof transition === "string") {
          transition = { target: transition };
        }

        // 检查守卫条件
        if (transition.guard && !transition.guard(this.context)) {
          console.warn(`守卫条件阻止转移: ${currentPath} -> ${event}`);
          return false;
        }

        // 执行转移动作
        if (transition.action) {
          transition.action(this.context);
        }

        // 进入目标状态
        this.enterState(transition.target);
        return true;
      }

      // 向上冒泡到父状态
      const pathSegments = currentPath.split(".");
      pathSegments.pop();
      currentPath = pathSegments.join(".");
    }

    console.warn(
      `未找到事件处理器: ${event} (当前状态: ${this.currentStatePath.join(
        ".",
      )})`,
    );
    return false;
  }

  /**
   * 发送事件（公共接口）
   */
  public send(event: string, payload?: any): boolean {
    return this.handleEvent(event, payload);
  }

  /**
   * 获取当前状态路径
   */
  public getCurrentState(): string {
    return this.currentStatePath.join(".");
  }
}
