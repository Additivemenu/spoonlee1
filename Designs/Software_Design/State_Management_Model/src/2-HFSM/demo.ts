// 实战：智能家居控制系统
const smartHomeHFSM = {
  initial: "off",
  states: {
    off: {
      on: { POWER_ON: "on" },
    },
    on: {
      initial: "idle",
      states: {
        idle: {
          on: {
            START_CLEANING: "cleaning",
            START_SECURITY: "security",
          },
        },
        cleaning: {
          initial: "mapping",
          states: {
            mapping: {
              on: { MAPPING_COMPLETE: "cleaning_rooms" },
            },
            cleaning_rooms: {
              on: { CLEANING_COMPLETE: "returning" },
            },
            returning: {
              on: { DOCKED: "idle" },
            },
          },
        },
        security: {
          on: {
            INTRUSION_DETECTED: "alert",
            DISABLE_SECURITY: "idle",
          },
        },
        alert: {
          on: {
            RESET_ALARM: "security",
          },
        },
      },
      on: {
        POWER_OFF: "off",
      },
    },
  },
};
