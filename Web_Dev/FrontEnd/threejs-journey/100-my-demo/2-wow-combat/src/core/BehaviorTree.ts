/**
 * Behavior Tree Node Status
 */
export enum NodeStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  RUNNING = 'RUNNING'
}

/**
 * Base Behavior Tree Node
 */
export abstract class BehaviorNode {
  abstract tick(): NodeStatus;
}

/**
 * Composite Nodes - have children
 */

/**
 * Sequence Node: Executes children in order until one fails
 * Returns SUCCESS only if all children succeed
 */
export class SequenceNode extends BehaviorNode {
  private children: BehaviorNode[];
  private currentIndex: number = 0;

  constructor(children: BehaviorNode[]) {
    super();
    this.children = children;
  }

  tick(): NodeStatus {
    while (this.currentIndex < this.children.length) {
      const status = this.children[this.currentIndex].tick();

      if (status === NodeStatus.FAILURE) {
        this.currentIndex = 0;
        return NodeStatus.FAILURE;
      }

      if (status === NodeStatus.RUNNING) {
        return NodeStatus.RUNNING;
      }

      // SUCCESS - move to next child
      this.currentIndex++;
    }

    // All children succeeded
    this.currentIndex = 0;
    return NodeStatus.SUCCESS;
  }
}

/**
 * Selector Node: Executes children until one succeeds
 * Returns FAILURE only if all children fail
 */
export class SelectorNode extends BehaviorNode {
  private children: BehaviorNode[];
  private currentIndex: number = 0;

  constructor(children: BehaviorNode[]) {
    super();
    this.children = children;
  }

  tick(): NodeStatus {
    while (this.currentIndex < this.children.length) {
      const status = this.children[this.currentIndex].tick();

      if (status === NodeStatus.SUCCESS) {
        this.currentIndex = 0;
        return NodeStatus.SUCCESS;
      }

      if (status === NodeStatus.RUNNING) {
        return NodeStatus.RUNNING;
      }

      // FAILURE - try next child
      this.currentIndex++;
    }

    // All children failed
    this.currentIndex = 0;
    return NodeStatus.FAILURE;
  }
}

/**
 * Leaf Nodes - no children
 */

/**
 * Condition Node: Tests a condition
 */
export class ConditionNode extends BehaviorNode {
  private condition: () => boolean;
  private errorMessage?: string;

  constructor(condition: () => boolean, errorMessage?: string) {
    super();
    this.condition = condition;
    this.errorMessage = errorMessage;
  }

  tick(): NodeStatus {
    const result = this.condition();
    
    if (!result && this.errorMessage) {
      console.log(`❌ ${this.errorMessage}`);
    }

    return result ? NodeStatus.SUCCESS : NodeStatus.FAILURE;
  }
}

/**
 * Action Node: Performs an action
 */
export class ActionNode extends BehaviorNode {
  private action: () => void;
  private name?: string;

  constructor(action: () => void, name?: string) {
    super();
    this.action = action;
    this.name = name;
  }

  tick(): NodeStatus {
    try {
      this.action();
      if (this.name) {
        console.log(`✅ ${this.name}`);
      }
      return NodeStatus.SUCCESS;
    } catch (error) {
      console.error(`❌ Action failed: ${error}`);
      return NodeStatus.FAILURE;
    }
  }
}

/**
 * Decorator Nodes - modify behavior of single child
 */

/**
 * Inverter Node: Inverts child result (SUCCESS ↔ FAILURE)
 */
export class InverterNode extends BehaviorNode {
  private child: BehaviorNode;

  constructor(child: BehaviorNode) {
    super();
    this.child = child;
  }

  tick(): NodeStatus {
    const status = this.child.tick();
    
    if (status === NodeStatus.SUCCESS) return NodeStatus.FAILURE;
    if (status === NodeStatus.FAILURE) return NodeStatus.SUCCESS;
    return NodeStatus.RUNNING;
  }
}

/**
 * Behavior Tree
 * Main entry point for executing behavior tree logic
 */
export class BehaviorTree {
  private root: BehaviorNode;

  constructor(root: BehaviorNode) {
    this.root = root;
  }

  /**
   * Execute the behavior tree
   */
  tick(): NodeStatus {
    return this.root.tick();
  }

  /**
   * Execute and return boolean for convenience
   */
  execute(): boolean {
    const status = this.tick();
    return status === NodeStatus.SUCCESS;
  }
}
