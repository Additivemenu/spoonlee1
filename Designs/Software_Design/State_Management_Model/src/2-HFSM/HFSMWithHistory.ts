// 历史状态管理器
class HistoryStateManager {
  private history: Map<string, string> = new Map(); // statePath -> lastActiveChild

  // 记录状态历史
  recordHistory(statePath: string, activeChild: string) {
    this.history.set(statePath, activeChild);
  }

  // 恢复历史状态
  restoreHistory(statePath: string): string | null {
    return this.history.get(statePath) || null;
  }

  // 深度历史恢复
  deepRestore(statePath: string): string[] {
    const restoredPath: string[] = [];
    let currentPath = statePath;

    while (currentPath) {
      const historyState = this.restoreHistory(currentPath);
      if (historyState) {
        currentPath = `${currentPath}.${historyState}`;
        restoredPath.push(currentPath);
      } else {
        break;
      }
    }

    return restoredPath;
  }
}

// 增强型HFSM with历史状态
class HFSMWithHistory extends HierarchicalFSM {
  private historyManager = new HistoryStateManager();

  protected enterState(statePath: string) {
    const { path } = this.resolveStatePath(statePath);

    // 检查是否需要恢复历史状态
    const parentPath = path.slice(0, -1).join(".");
    if (parentPath) {
      const historyState = this.historyManager.restoreHistory(parentPath);
      if (historyState && path[path.length - 1] === historyState) {
        // 这是历史状态的恢复，继续深度恢复
        const deepPath = this.historyManager.deepRestore(statePath);
        if (deepPath.length > 0) {
          super.enterState(deepPath[deepPath.length - 1]);
          return;
        }
      }
    }

    super.enterState(statePath);

    // 记录历史
    if (path.length > 1) {
      const parentPath = path.slice(0, -1).join(".");
      this.historyManager.recordHistory(parentPath, path[path.length - 1]);
    }
  }
}
