const logContainer = document.getElementById("logContainer");
const phaseIndicator = document.getElementById("phaseIndicator");
let eventCounter = 0;
let captureEnabled = false;

function addLogEntry(element, phase, eventType = "click") {
  eventCounter++;
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = document.createElement("div");
  logEntry.className = `log-entry ${phase}-phase`;

  const phaseText = {
    capture: "📥 捕获阶段",
    target: "🎯 目标阶段",
    bubble: "📤 冒泡阶段",
  };

  logEntry.innerHTML = `
                <strong>${eventCounter}. ${phaseText[phase]}</strong> 
                [${timestamp}] ${element} - ${eventType} 事件
            `;

  // 清空初始消息
  if (
    logContainer.children.length === 1 &&
    logContainer.children[0].textContent === "日志将在这里显示..."
  ) {
    logContainer.innerHTML = "";
  }

  logContainer.appendChild(logEntry);
  logContainer.scrollTop = logContainer.scrollHeight;

  // 更新阶段指示器
  updatePhaseIndicator(phase, element);
}

function updatePhaseIndicator(phase, element) {
  const phaseText = {
    capture: "🔍 捕获阶段进行中",
    target: "🎯 在目标元素执行",
    bubble: "💨 冒泡阶段进行中",
  };

  phaseIndicator.innerHTML = `
                <strong>${phaseText[phase]}</strong><br>
                当前处理: ${element}
            `;

  // 短暂延迟后清空
  setTimeout(() => {
    phaseIndicator.innerHTML = "等待下一次点击...";
  }, 2000);
}

function setupEventListeners() {
  const elements = ["grandparent", "parent", "child", "target"];

  elements.forEach((id) => {
    const element = document.getElementById(id);

    // 冒泡阶段监听器（默认）
    element.addEventListener("click", function (e) {
      const phase = e.target === element ? "target" : "bubble";
      addLogEntry(id.toUpperCase(), phase);
    });

    // 捕获阶段监听器
    element.addEventListener(
      "click",
      function (e) {
        if (captureEnabled) {
          const phase = e.target === element ? "target" : "capture";
          addLogEntry(id.toUpperCase() + " (捕获)", phase);
        }
      },
      true,
    ); //! true 表示在捕获阶段触发
  });

  // 添加 document 和 body 的监听器来展示完整流程
  document.addEventListener("click", function (e) {
    if (e.target.id === "target") {
      addLogEntry("DOCUMENT", "bubble");
    }
  });

  document.body.addEventListener("click", function (e) {
    if (e.target.id === "target") {
      addLogEntry("BODY", "bubble");
    }
  });

  if (captureEnabled) {
    document.addEventListener(
      "click",
      function (e) {
        if (e.target.id === "target") {
          addLogEntry("DOCUMENT (捕获)", "capture");
        }
      },
      true,
    );

    document.body.addEventListener(
      "click",
      function (e) {
        if (e.target.id === "target") {
          addLogEntry("BODY (捕获)", "capture");
        }
      },
      true,
    );
  }
}

function clearLog() {
  logContainer.innerHTML = '<div class="log-entry">日志已清空...</div>';
  eventCounter = 0;
  phaseIndicator.innerHTML = "等待点击事件...";
}

function toggleCapture() {
  captureEnabled = !captureEnabled;
  const status = document.getElementById("captureStatus");
  status.textContent = captureEnabled ? "禁用捕获监听" : "启用捕获监听";

  // 重新设置监听器
  // 注意：这是简化演示，实际项目中需要正确移除旧监听器
  location.reload(); // 简单重载页面来重置监听器
}

// 初始化
setupEventListeners();

// 添加说明性日志
setTimeout(() => {
  addLogEntry("系统", "bubble", "演示已准备就绪");
}, 500);
