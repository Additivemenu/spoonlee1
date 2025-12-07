// HFSM 测试示例 - 智能家居控制系统

/**
 * 智能家居系统的分层状态机结构图
 *
 * 这个 HFSM 展示了：
 * 1. 分层状态结构（off/on/cleaning 等）
 * 2. 复合状态的初始子状态（用 [*] 表示）
 * 3. 事件驱动的状态转移
 * 4. 事件冒泡机制（POWER_OFF 可以在任何子状态触发）
 *
 * 关键特性：
 * - **复合状态**: `on` 和 `cleaning` 都包含子状态
 * - **初始状态**: 每个复合状态都定义了初始子状态
 * - **事件冒泡**: `POWER_OFF` 在 `on` 状态定义，所有子状态都能响应
 * - **深层嵌套**: `cleaning` 作为 `on` 的子状态，又包含自己的子状态
 */

// 定义智能家居的 HFSM 配置
const smartHomeConfig: HFSMConfig = {
  initial: "off",
  context: {
    cleaningProgress: 0,
    securityLevel: 0,
  },
  states: {
    off: {
      entry: (ctx) => console.log("🔴 系统关闭"),
      on: {
        POWER_ON: "on",
      },
      exit: (ctx) => console.log("👋 离开关闭状态"),
    },
    on: {
      initial: "idle",
      entry: (ctx) => console.log("🟢 系统开启"),
      states: {
        idle: {
          entry: (ctx) => console.log("  💤 待机模式"),
          on: {
            START_CLEANING: "on.cleaning",
            START_SECURITY: "on.security",
          },
        },
        //! cleaning 还有它的子状态
        cleaning: {
          initial: "mapping",
          entry: (ctx) => console.log("  🧹 开始清洁"),
          states: {
            mapping: {
              entry: (ctx) => console.log("    🗺️  地图扫描中..."),
              on: {
                MAPPING_COMPLETE: "on.cleaning.cleaning_rooms",
              },
            },
            cleaning_rooms: {
              entry: (ctx) => console.log("    🏠 清洁房间中..."),
              on: {
                CLEANING_COMPLETE: "on.cleaning.returning",
              },
            },
            returning: {
              entry: (ctx) => console.log("    🔙 返回充电座..."),
              on: {
                DOCKED: "on.idle",
              },
            },
          },
        },
        security: {
          entry: (ctx) => console.log("  🔒 安全模式激活"),
          on: {
            INTRUSION_DETECTED: "on.alert",
            DISABLE_SECURITY: "on.idle",
          },
        },
        alert: {
          entry: (ctx) => console.log("  🚨 警报！检测到入侵"),
          on: {
            RESET_ALARM: "on.security",
          },
        },
      },
      on: {
        POWER_OFF: "off", // 在 on 的任何子状态都可以处理此事件（事件冒泡）
      },
      exit: (ctx) => console.log("👋 离开开启状态"),
    },
  },
};

// 创建 HFSM 实例
const smartHome = new HierarchicalFSM(smartHomeConfig);

console.log("\n=== 智能家居控制系统演示 ===\n");

// 测试场景 1: 基本状态转移
console.log("📍 当前状态:", smartHome.getCurrentState());
console.log("\n--- 开机 ---");
smartHome.send("POWER_ON");
console.log("📍 当前状态:", smartHome.getCurrentState());

// 测试场景 2: 进入清洁模式（嵌套状态）
console.log("\n--- 开始清洁 ---");
smartHome.send("START_CLEANING");
console.log("📍 当前状态:", smartHome.getCurrentState());

// 测试场景 3: 清洁流程
console.log("\n--- 完成地图扫描 ---");
smartHome.send("MAPPING_COMPLETE");
console.log("📍 当前状态:", smartHome.getCurrentState());

console.log("\n--- 完成房间清洁 ---");
smartHome.send("CLEANING_COMPLETE");
console.log("📍 当前状态:", smartHome.getCurrentState());

console.log("\n--- 返回充电座 ---");
smartHome.send("DOCKED");
console.log("📍 当前状态:", smartHome.getCurrentState());

// 测试场景 4: 事件冒泡（在清洁的深层子状态也能处理 POWER_OFF）
console.log("\n--- 再次开始清洁 ---");
smartHome.send("START_CLEANING");
console.log("📍 当前状态:", smartHome.getCurrentState());

console.log("\n--- 在清洁状态直接关机（事件冒泡到父状态 on）---");
smartHome.send("POWER_OFF");
console.log("📍 当前状态:", smartHome.getCurrentState());

// 测试场景 5: 安全模式
console.log("\n--- 重新开机 ---");
smartHome.send("POWER_ON");
console.log("\n--- 激活安全模式 ---");
smartHome.send("START_SECURITY");
console.log("📍 当前状态:", smartHome.getCurrentState());

console.log("\n--- 检测到入侵 ---");
smartHome.send("INTRUSION_DETECTED");
console.log("📍 当前状态:", smartHome.getCurrentState());

console.log("\n--- 重置警报 ---");
smartHome.send("RESET_ALARM");
console.log("📍 当前状态:", smartHome.getCurrentState());

console.log("\n=== 演示完成 ===\n");

// 导出以便在其他地方使用
export { smartHome, smartHomeConfig };
