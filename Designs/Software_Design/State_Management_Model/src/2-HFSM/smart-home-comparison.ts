/**
 * 单层 FSM vs HFSM 对比
 *
 * 这个文件展示了如何用扁平的 FSM 实现相同的智能家居系统
 * 以及为什么 HFSM 更易于管理
 */

import { EnterpriseFSM } from "../1-FSM/EnterpriseFSM";

// ==================== 单层 FSM 实现 ====================

/**
 * 状态数量对比：
 * - HFSM: 9 个状态（off, on, idle, cleaning, mapping, cleaning_rooms, returning, security, alert）
 * - 扁平 FSM: 9 个状态，但所有状态都在同一层级
 *
 * 问题：
 * 1. 状态命名必须全局唯一，需要用前缀区分（如 on_idle, on_cleaning_mapping）
 * 2. POWER_OFF 事件需要在多个状态重复定义
 * 3. 状态转移关系不清晰，难以维护
 */

type FlatSmartHomeState =
  | "off"
  | "on_idle" // 原来的 on.idle
  | "on_cleaning_mapping" // 原来的 on.cleaning.mapping
  | "on_cleaning_rooms" // 原来的 on.cleaning.cleaning_rooms
  | "on_cleaning_returning" // 原来的 on.cleaning.returning
  | "on_security" // 原来的 on.security
  | "on_alert"; // 原来的 on.alert

type FlatSmartHomeEvent =
  | "POWER_ON"
  | "POWER_OFF"
  | "START_CLEANING"
  | "START_SECURITY"
  | "MAPPING_COMPLETE"
  | "CLEANING_COMPLETE"
  | "DOCKED"
  | "INTRUSION_DETECTED"
  | "RESET_ALARM"
  | "DISABLE_SECURITY";

interface FlatSmartHomeContext {
  cleaningProgress: number;
  securityLevel: number;
}

const flatSmartHomeConfig = {
  initialState: "off" as FlatSmartHomeState,
  context: {
    cleaningProgress: 0,
    securityLevel: 0,
  },
  states: {
    off: {
      entry: (ctx: FlatSmartHomeContext) => console.log("🔴 系统关闭"),
      on: {
        POWER_ON: {
          target: "on_idle" as FlatSmartHomeState,
        },
      },
      exit: (ctx: FlatSmartHomeContext) => console.log("👋 离开关闭状态"),
    },

    // ❌ 问题1: 所有 "on" 的子状态都需要单独处理 POWER_OFF
    on_idle: {
      entry: (ctx: FlatSmartHomeContext) =>
        console.log("🟢 系统开启 - 💤 待机模式"),
      on: {
        POWER_OFF: { target: "off" as FlatSmartHomeState }, // 重复定义
        START_CLEANING: { target: "on_cleaning_mapping" as FlatSmartHomeState },
        START_SECURITY: { target: "on_security" as FlatSmartHomeState },
      },
    },

    on_cleaning_mapping: {
      entry: (ctx: FlatSmartHomeContext) =>
        console.log("🟢 系统开启 - 🧹 清洁中 - 🗺️  地图扫描"),
      on: {
        POWER_OFF: { target: "off" as FlatSmartHomeState }, // 重复定义
        MAPPING_COMPLETE: { target: "on_cleaning_rooms" as FlatSmartHomeState },
      },
    },

    on_cleaning_rooms: {
      entry: (ctx: FlatSmartHomeContext) =>
        console.log("🟢 系统开启 - 🧹 清洁中 - 🏠 清洁房间"),
      on: {
        POWER_OFF: { target: "off" as FlatSmartHomeState }, // 重复定义
        CLEANING_COMPLETE: {
          target: "on_cleaning_returning" as FlatSmartHomeState,
        },
      },
    },

    on_cleaning_returning: {
      entry: (ctx: FlatSmartHomeContext) =>
        console.log("🟢 系统开启 - 🧹 清洁中 - 🔙 返回充电座"),
      on: {
        POWER_OFF: { target: "off" as FlatSmartHomeState }, // 重复定义
        DOCKED: { target: "on_idle" as FlatSmartHomeState },
      },
    },

    on_security: {
      entry: (ctx: FlatSmartHomeContext) =>
        console.log("🟢 系统开启 - 🔒 安全模式"),
      on: {
        POWER_OFF: { target: "off" as FlatSmartHomeState }, // 重复定义
        INTRUSION_DETECTED: { target: "on_alert" as FlatSmartHomeState },
        DISABLE_SECURITY: { target: "on_idle" as FlatSmartHomeState },
      },
    },

    on_alert: {
      entry: (ctx: FlatSmartHomeContext) =>
        console.log("🟢 系统开启 - 🚨 警报"),
      on: {
        POWER_OFF: { target: "off" as FlatSmartHomeState }, // 重复定义
        RESET_ALARM: { target: "on_security" as FlatSmartHomeState },
      },
    },
  },
};

// ==================== Mermaid 对比图 ====================

/**
 * 扁平 FSM 状态图（所有状态在同一层级）
 *
 * 对比 HFSM 的问题：
 * 1. ❌ 状态爆炸：9 个状态都在顶层，难以理解层级关系
 * 2. ❌ 事件重复：POWER_OFF 需要在 6 个状态重复定义（代码重复）
 * 3. ❌ 命名冲突：必须用前缀（on_cleaning_mapping）来避免冲突
 * 4. ❌ 不易扩展：添加新的清洁子状态需要修改多处
 * 5. ❌ 缺少上下文：无法看出 mapping/rooms/returning 都属于 cleaning
 *
 * ```mermaid
 * stateDiagram-v2
 *     [*] --> off
 *
 *     off --> on_idle : POWER_ON
 *
 *     on_idle --> on_cleaning_mapping : START_CLEANING
 *     on_idle --> on_security : START_SECURITY
 *     on_idle --> off : POWER_OFF
 *
 *     on_cleaning_mapping --> on_cleaning_rooms : MAPPING_COMPLETE
 *     on_cleaning_mapping --> off : POWER_OFF
 *
 *     on_cleaning_rooms --> on_cleaning_returning : CLEANING_COMPLETE
 *     on_cleaning_rooms --> off : POWER_OFF
 *
 *     on_cleaning_returning --> on_idle : DOCKED
 *     on_cleaning_returning --> off : POWER_OFF
 *
 *     on_security --> on_alert : INTRUSION_DETECTED
 *     on_security --> on_idle : DISABLE_SECURITY
 *     on_security --> off : POWER_OFF
 *
 *     on_alert --> on_security : RESET_ALARM
 *     on_alert --> off : POWER_OFF
 *
 *     note right of off
 *         所有状态都在同一层级
 *         状态命名需要用前缀区分
 *     end note
 *
 *     note right of on_cleaning_mapping
 *         POWER_OFF 需要在每个状态重复定义
 *         无法表达 cleaning 的子状态关系
 *     end note
 * ```
 */

/**
 * HFSM 状态图（分层结构）
 *
 * HFSM 的优势：
 * 1. ✅ 清晰的层级：一眼看出 cleaning 有 3 个子状态
 * 2. ✅ 事件继承：POWER_OFF 只需在 on 定义一次，所有子状态自动继承
 * 3. ✅ 命名空间：子状态可以用简单名称（mapping 而不是 on_cleaning_mapping）
 * 4. ✅ 易于扩展：在 cleaning 内添加新状态不影响其他部分
 * 5. ✅ 上下文清晰：状态的组织关系一目了然
 *
 * ```mermaid
 * stateDiagram-v2
 *     [*] --> off
 *
 *     off --> on : POWER_ON
 *     on --> off : POWER_OFF
 *
 *     state on {
 *         [*] --> idle
 *
 *         idle --> cleaning : START_CLEANING
 *         idle --> security : START_SECURITY
 *
 *         state cleaning {
 *             [*] --> mapping
 *             mapping --> cleaning_rooms : MAPPING_COMPLETE
 *             cleaning_rooms --> returning : CLEANING_COMPLETE
 *             returning --> idle : DOCKED
 *         }
 *
 *         security --> alert : INTRUSION_DETECTED
 *         security --> idle : DISABLE_SECURITY
 *         alert --> security : RESET_ALARM
 *     }
 *
 *     note right of on
 *         POWER_OFF 在这里定义一次
 *         所有子状态自动继承
 *     end note
 *
 *     note right of cleaning
 *         清洁的 3 个子状态
 *         形成清晰的工作流
 *     end note
 * ```
 */

// ==================== 量化对比 ====================

console.log("\n=== 单层 FSM vs HFSM 对比分析 ===\n");

console.log("📊 代码复杂度对比：");
console.log("┌─────────────────────────┬──────────┬──────────┐");
console.log("│ 指标                    │ 扁平 FSM │ HFSM     │");
console.log("├─────────────────────────┼──────────┼──────────┤");
console.log("│ 状态定义数量            │ 7        │ 9        │");
console.log("│ POWER_OFF 重复次数      │ 6 次     │ 1 次 ✅  │");
console.log("│ 状态名称长度（平均）    │ 18 字符  │ 8 字符 ✅│");
console.log("│ 层级深度                │ 1 层     │ 3 层 ✅  │");
console.log("│ 易于理解程度            │ ⭐⭐     │ ⭐⭐⭐⭐⭐ │");
console.log("│ 易于维护程度            │ ⭐⭐     │ ⭐⭐⭐⭐⭐ │");
console.log("│ 可扩展性                │ ⭐⭐     │ ⭐⭐⭐⭐⭐ │");
console.log("└─────────────────────────┴──────────┴──────────┘");

console.log("\n🔍 关键问题分析：\n");

console.log("1️⃣  状态爆炸问题：");
console.log("   扁平 FSM: 所有 7 个状态在同一层级");
console.log("   HFSM:     3 层结构，顶层只有 2 个状态 (off/on)");
console.log("   影响:     HFSM 更容易理解和导航\n");

console.log("2️⃣  代码重复问题：");
console.log("   扁平 FSM: POWER_OFF 需要在 6 个状态重复定义");
console.log("   HFSM:     POWER_OFF 只在 'on' 状态定义一次");
console.log("   影响:     修改 POWER_OFF 逻辑时，HFSM 只改一处\n");

console.log("3️⃣  命名冲突问题：");
console.log("   扁平 FSM: 需要 'on_cleaning_mapping' 这样的长名称");
console.log(
  "   HFSM:     可以用 'mapping'，通过路径 'on.cleaning.mapping' 区分",
);
console.log("   影响:     HFSM 代码更简洁，命名空间更清晰\n");

console.log("4️⃣  扩展性问题：");
console.log("   场景: 在 cleaning 中添加 'charging' 子状态");
console.log(
  "   扁平 FSM: 需要添加 'on_cleaning_charging'，并更新所有相关状态的 POWER_OFF",
);
console.log(
  "   HFSM:     只需在 cleaning.states 中添加 'charging'，自动继承 POWER_OFF",
);
console.log("   影响:     HFSM 降低了修改的风险和工作量\n");

console.log("5️⃣  状态关系问题：");
console.log(
  "   扁平 FSM: 无法直观看出 mapping/rooms/returning 都属于 cleaning",
);
console.log("   HFSM:     状态的层级关系明确表达了逻辑分组");
console.log("   影响:     HFSM 的代码结构即是文档\n");

console.log("\n💡 结论：\n");
console.log("虽然扁平 FSM 可以表达相同的行为，但 HFSM 提供了：");
console.log("✅ 更好的代码组织（层级结构）");
console.log("✅ 更少的重复代码（事件继承）");
console.log("✅ 更清晰的命名（命名空间）");
console.log("✅ 更容易扩展（局部修改）");
console.log("✅ 更易于理解（视觉层次）");
console.log("\n这就是为什么在复杂场景中优先选择 HFSM！\n");

// ==================== 实际测试 ====================

console.log("=== 扁平 FSM 运行测试 ===\n");

const flatSmartHome = new EnterpriseFSM<
  FlatSmartHomeState,
  FlatSmartHomeEvent,
  FlatSmartHomeContext
>(flatSmartHomeConfig);

console.log("📍 初始状态:", flatSmartHome.getCurrentState());
console.log("\n--- 开机 ---");
await flatSmartHome.send("POWER_ON");
console.log("📍 当前状态:", flatSmartHome.getCurrentState());

console.log("\n--- 开始清洁 ---");
await flatSmartHome.send("START_CLEANING");
console.log("📍 当前状态:", flatSmartHome.getCurrentState());

console.log("\n--- 完成地图扫描 ---");
await flatSmartHome.send("MAPPING_COMPLETE");
console.log("📍 当前状态:", flatSmartHome.getCurrentState());

console.log("\n--- 在清洁状态关机 ---");
await flatSmartHome.send("POWER_OFF");
console.log("📍 当前状态:", flatSmartHome.getCurrentState());

console.log("\n=== 测试完成 ===\n");

console.log("📝 注意：扁平 FSM 的功能是完全相同的，");
console.log("    只是在管理和维护上更加困难！\n");

export { flatSmartHomeConfig, FlatSmartHomeState, FlatSmartHomeEvent };
