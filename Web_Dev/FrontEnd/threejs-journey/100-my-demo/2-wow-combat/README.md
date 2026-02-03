# WoW Combat System 🎮

A WoW-inspired combat system with **Three.js** + **TypeScript**, featuring FSM and Behavior Tree patterns.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

**Controls:**

- `WASD` - Move | `Mouse` - Look | `Click` - Target monster
- `1` Attack (15 energy) | `2` Heavy Strike (30 energy, 3s CD) | `3` Heal (40 energy, 5s CD)

## 🏗️ Architecture

```
src/
├── core/
│   ├── StateMachine.ts      # FSM (Monster AI)
│   └── BehaviorTree.ts      # Behavior Tree (Player skills)
├── entities/
│   ├── Entity.ts            # Base class
│   ├── Player.ts            # Player logic
│   └── Monster.ts           # Monster AI (FSM: Idle→Chase→Attack)
└── systems/
    ├── SkillManager.ts      # Skill validation (Behavior Tree)
    ├── InputHandler.ts      # Input handling
    └── UIManager.ts         # UI updates
```

## 🎯 Core Systems

### 1. Monster AI - Finite State Machine

```typescript
States: Idle → Chase → Attack
- Idle:   Monitor for players
- Chase:  Move toward player (10m range)
- Attack: Attack player (2m range, every 2s)
```

### 2. Player Skills - Behavior Tree

**Why Behavior Tree over Decision Tree?**

- ✅ Modular & reusable (flat structure vs nested hell)
- ✅ Industry standard for game AI
- ✅ Supports async operations (RUNNING state)

**Skill Validation (SequenceNode):**

```typescript
[✓ GCD ready] → [✓ Skill off CD] → [✓ Has energy]
  → [✓ Has target] → [✓ In range] → [Execute]
```

All conditions must succeed for skill to execute.

### 3. Behavior Tree Node Types

| Type              | Purpose                         | Example              |
| ----------------- | ------------------------------- | -------------------- |
| **SequenceNode**  | All children must succeed (AND) | Skill validation     |
| **SelectorNode**  | Any child succeeds (OR)         | Try multiple options |
| **ConditionNode** | Check condition                 | `energy >= 50`       |
| **ActionNode**    | Execute action                  | `player.attack()`    |
| **InverterNode**  | Invert result                   | `!isInRange()`       |

**Node Status:**

- `SUCCESS` ✅ - Operation succeeded
- `FAILURE` ❌ - Operation failed
- `RUNNING` ⏳ - Async operation in progress

## 📖 Example Usage

### Player Skill System

```typescript
// Old: Decision Tree (nested)
DecisionTree.createCondition(
  () => check1(),
  DecisionTree.createCondition(
    () => check2(), // Nested hell 😵
    ...
  )
)

// New: Behavior Tree (flat)
new BehaviorTree(
  new SequenceNode([
    new ConditionNode(() => checkGCD(), "GCD active"),
    new ConditionNode(() => checkCooldown(), "On cooldown"),
    new ConditionNode(() => checkEnergy(), "Not enough energy"),
    new ConditionNode(() => checkTarget(), "No target"),
    new ConditionNode(() => checkRange(), "Out of range"),
    new ActionNode(() => executeSkill(), "Executing skill")
  ])
)
```

### Monster AI (FSM Alternative with Behavior Tree)

```typescript
// Current: FSM
Monster uses state machine: Idle → Chase → Attack

// Future: Behavior Tree (more flexible)
new SelectorNode([
  // Option 1: Attack
  new SequenceNode([
    new ConditionNode(() => hasTarget()),
    new ConditionNode(() => isInAttackRange()),
    new ActionNode(() => attack())
  ]),
  // Option 2: Chase
  new SequenceNode([
    new ConditionNode(() => hasTarget()),
    new ActionNode(() => chase())
  ]),
  // Option 3: Patrol (fallback)
  new ActionNode(() => patrol())
])
```

## 🔧 Key Design Patterns

### Logic-Rendering Separation

| Layer                    | Responsibility                       |
| ------------------------ | ------------------------------------ |
| **Logic** (TypeScript)   | FSM, Behavior Tree, combat math, AI  |
| **Rendering** (Three.js) | Meshes, camera, lighting, animations |

**Benefits:** Testable, maintainable, extensible.

### Entity Component System

```typescript
abstract class Entity {
  mesh: THREE.Mesh
  health, energy: number
  target: Entity | null

  takeDamage(amount)
  heal(amount)
  distanceTo(entity)  // 2D distance (XZ plane)
  abstract update(deltaTime)
}
```

## 🎮 Testing

Open browser console (F12):

```javascript
// ✅ Success
1. Click monster → Press 1 → "✅ Executing Attack"

// ❌ Failure cases
2. Press 1 (no target) → "❌ No target selected"
3. Spam 1 → "❌ Global cooldown active"
4. Low energy → "❌ Not enough energy"
```

## 🚀 Extensions

### Add New Skill

```typescript
// src/systems/SkillManager.ts
this.skills.set("fireball", {
  name: "Fireball",
  energyCost: 25,
  damage: 30,
  range: 10,
  cooldown: 2,
  execute: (player) => {
    player.target?.takeDamage(30);
  },
});
```

### Add New Monster State

```typescript
// src/entities/Monster.ts
this.fsm.addState({
  name: "Flee",
  enter: () => console.log("Fleeing!"),
  update: (dt) => {
    /* flee logic */
  },
  exit: () => {},
});
```

## 📚 Tech Stack

- **Three.js** (v0.160.0) - 3D rendering
- **TypeScript** (v5.3.3) - Type safety
- **Vite** (v5.0.11) - Build tool

## 📝 TODO

- [ ] Add AnimationMixer for smooth animations
- [ ] Particle effects for skills
- [ ] Multiple monsters with aggro system
- [ ] Buff/debuff system
- [ ] Combo system

## 📖 References

- [Three.js Docs](https://threejs.org/docs/)
- [FSM Pattern](https://gameprogrammingpatterns.com/state.html)
- [Behavior Trees](<https://en.wikipedia.org/wiki/Behavior_tree_(artificial_intelligence,_robotics_and_control)>)

---

**MIT License** | Built with ❤️ for game AI learning
