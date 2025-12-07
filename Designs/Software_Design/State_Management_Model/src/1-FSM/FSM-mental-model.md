# FSM 思维模型 (Mental Model)

## 核心概念类图

这个图展示了 EnterpriseFSM 的核心思维模型和架构设计：

```mermaid
classDiagram
    %% 核心类和接口
    class EnterpriseFSM~TState, TEvent, TContext~ {
        -currentState: TState
        -context: TContext
        -config: FSMConfig
        -stateHistory: Array
        -listeners: Array
        +send(event, payload) Promise~boolean~
        -executeStateAction(type, state)
        -recordState(event)
        -notifyListeners(transition)
        +timeTravelTo(index)
        +getReachableStates() Set~TState~
    }

    class FSMConfig~TState, TEvent, TContext~ {
        +id: string
        +initial: TState
        +states: Record~TState, StateConfig~
        +context: TContext
    }

    class StateConfig {
        +on: Record~TEvent, TransitionConfig~
        +entry: Function
        +exit: Function
    }

    class TransitionConfig {
        +target: TState
        +action: Function
        +guard: Function
    }

    class StateHistory {
        +state: TState
        +timestamp: number
        +event: TEvent
    }

    class Listener {
        <<interface>>
        +from: TState
        +to: TState
        +event: TEvent
        +context: TContext
    }

    %% 关系定义
    EnterpriseFSM *-- FSMConfig : 包含配置
    EnterpriseFSM o-- StateHistory : 记录历史
    EnterpriseFSM o-- Listener : 通知监听器
    FSMConfig *-- StateConfig : 定义多个状态
    StateConfig *-- TransitionConfig : 定义状态转移

    %% 注释
    note for EnterpriseFSM "核心状态机类\n管理状态、上下文和转移逻辑"
    note for FSMConfig "声明式配置\n定义状态图和行为"
    note for StateConfig "单个状态配置\n包含转移规则和生命周期钩子"
    note for TransitionConfig "转移配置\n包含目标状态、动作和守卫条件"
```

## 状态转移生命周期

这个图展示了调用 `send()` 方法时的完整状态转移流程：

```mermaid
flowchart TD
    Start([send event, payload]) --> Validate{转移是否定义?}
    Validate -->|否| Warn1[警告: 无定义转移]
    Warn1 --> ReturnFalse1[return false]

    Validate -->|是| Guard{守卫条件通过?}
    Guard -->|否| Warn2[警告: 守卫条件阻止]
    Warn2 --> ReturnFalse2[return false]

    Guard -->|是| Exit[执行源状态 exit 钩子]
    Exit --> Action[执行转移 action]
    Action --> Update[更新 currentState]
    Update --> Entry[执行目标状态 entry 钩子]
    Entry --> Record[记录状态历史]
    Record --> Notify[通知所有监听器]
    Notify --> ReturnTrue[return true]

    style Start fill:#e1f5ff
    style ReturnTrue fill:#c8e6c9
    style ReturnFalse1 fill:#ffcdd2
    style ReturnFalse2 fill:#ffcdd2
    style Guard fill:#fff9c4
    style Validate fill:#fff9c4
```

## Context 的作用域

这个图展示了 Context 在 FSM 各个部分的流动和访问：

```mermaid
flowchart LR
    Context[(Context\n业务数据存储)]

    Context --> Guard[Guard 函数\n条件判断]
    Context --> Action[Action 函数\n执行操作]
    Context --> Entry[Entry 钩子\n进入状态]
    Context --> Exit[Exit 钩子\n退出状态]
    Context --> Listener[Listeners\n观察者]

    Payload[send payload] -.合并.-> Context

    Guard -.读取.-> Context
    Action -.读写.-> Context
    Entry -.读取.-> Context
    Exit -.读取.-> Context
    Listener -.读取.-> Context

    style Context fill:#bbdefb
    style Payload fill:#fff9c4
    style Guard fill:#c8e6c9
    style Action fill:#c8e6c9
    style Entry fill:#ffecb3
    style Exit fill:#ffecb3
    style Listener fill:#e1bee7
```

## 观察者模式实现

这个图展示了 FSM 如何实现观察者模式，让外部代码响应状态变化：

```mermaid
flowchart TD
    FSM[EnterpriseFSM]

    FSM -->|状态转移发生| Notify{notifyListeners}

    Notify --> L1[Listener 1\nUI 更新]
    Notify --> L2[Listener 2\n日志记录]
    Notify --> L3[Listener 3\n分析统计]
    Notify --> L4[Listener N\n...]

    L1 --> Info[接收转移信息:\n- from: TState\n- to: TState\n- event: TEvent\n- context: TContext]
    L2 --> Info
    L3 --> Info
    L4 --> Info

    style FSM fill:#e1f5ff
    style Notify fill:#fff9c4
    style Info fill:#c8e6c9
```

## 类型安全的泛型设计

这个图展示了泛型参数如何实现类型安全：

```mermaid
classDiagram
    class EnterpriseFSM~TState, TEvent, TContext~ {
        <<Generic Class>>
    }

    class EditorState {
        <<Type Union>>
        "draft"
        "editing"
        "reviewing"
        "approved"
        "rejected"
        "published"
    }

    class EditorEvent {
        <<Type Union>>
        "EDIT"
        "SUBMIT"
        "APPROVE"
        "REJECT"
        "PUBLISH"
        "RETURN"
    }

    class EditorContext {
        +documentId: string
        +version: number
        +changes: string[]
    }

    EnterpriseFSM --|> EditorState : TState 类型参数
    EnterpriseFSM --|> EditorEvent : TEvent 类型参数
    EnterpriseFSM --|> EditorContext : TContext 类型参数

    note for EnterpriseFSM "泛型类\n提供类型安全的状态机"
    note for EditorContext "具体的业务上下文\n编译时类型检查"
```

## 核心设计模式总结

1. **有限状态机模式 (FSM Pattern)**

   - 将系统行为建模为一组离散的状态和状态之间的转移

2. **观察者模式 (Observer Pattern)**

   - 通过 listeners 让外部代码订阅状态变化

3. **策略模式 (Strategy Pattern)**

   - guard、action、entry、exit 函数作为可插拔的策略

4. **命令模式 (Command Pattern)**

   - 事件（Event）封装了状态转移的请求

5. **模板方法模式 (Template Method Pattern)**

   - send() 方法定义了状态转移的固定步骤

6. **泛型编程 (Generic Programming)**
   - 通过 TypeScript 泛型实现类型安全和代码复用
