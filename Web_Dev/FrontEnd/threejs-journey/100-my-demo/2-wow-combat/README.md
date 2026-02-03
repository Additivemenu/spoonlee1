# WoW-Alike Combat System

A World of Warcraft-inspired combat system built with **Three.js** and **TypeScript**, featuring:

- **Finite State Machine (FSM)** for Monster AI
- **Behavior Tree** for Player Skill Management
- Clean separation of rendering and game logic

## 🎮 Features

### Monster AI (FSM)

The monster uses a Finite State Machine with three states:

- **Idle**: Standing idle, monitoring for nearby players
- **Chase**: Running towards the player when in range
- **Attack**: Attacking the player when close enough

### Player Skills (Behavior Tree)

Each skill execution uses a **Sequence Node** behavior tree that validates:

1. ✅ Is Global Cooldown (GCD) ready?
2. ✅ Is the skill off cooldown?
3. ✅ Does the player have enough energy?
4. ✅ Is there a valid target?
5. ✅ Is the target in range?

All conditions must pass (SUCCESS) for the skill to execute!

### Available Skills

- **[1] Attack**: 15 energy, 20 damage, 3m range
- **[2] Heavy Strike**: 30 energy, 40 damage, 3m range, 3s cooldown
- **[3] Heal**: 40 energy, 30 healing, self-cast, 5s cooldown

## 🏗️ Architecture

```
src/
├── core/
│   ├── StateMachine.ts      # FSM implementation
│   └── BehaviorTree.ts      # Behavior tree implementation
├── entities/
│   ├── Entity.ts            # Base entity class
│   ├── Player.ts            # Player entity
│   └── Monster.ts           # Monster entity with FSM
├── systems/
│   ├── SkillManager.ts      # Skill system with behavior trees
│   ├── InputHandler.ts      # Input handling
│   └── UIManager.ts         # UI updates
└── main.ts                  # Game initialization and loop
```

### Design Principles

#### 1. **Logic-Rendering Separation**

- **Logic Layer**: State management, combat calculations, AI decisions
- **Rendering Layer**: Three.js mesh animations, particle effects, UI

#### 2. **Entity System**

All game objects inherit from `Entity` base class with:

- Position and mesh reference
- Health and energy stats
- Combat methods (takeDamage, heal)
- Distance calculations (simplified 2D on XZ plane)

#### 3. **Finite State Machine (Monster AI)**

```typescript
class Monster {
  fsm: StateMachine;
  states: [Idle, Chase, Attack];
}
```

Each state has:

- `enter()`: Called when entering the state
- `update(deltaTime)`: Called every frame
- `exit()`: Called when leaving the state

#### 4. **Behavior Tree (Player Skills)**

```typescript
useSkill(name) {
  BehaviorTree(
    SequenceNode([
      ConditionNode(Check GCD),
      ConditionNode(Check Cooldown),
      ConditionNode(Check Energy),
      ConditionNode(Check Target),
      ConditionNode(Check Range),
      ActionNode(Execute Skill)
    ])
  )
}
```

**Why Behavior Tree?**

- More modular and reusable than decision trees
- Clearer structure with composite nodes (Sequence, Selector)
- Supports complex AI logic
- Industry-standard for game AI

See `BEHAVIOR_TREE.md` for detailed explanation!

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Controls

- **WASD**: Move player
- **Mouse**: Look around
- **Click Monster**: Target monster
- **1**: Use Attack
- **2**: Use Heavy Strike
- **3**: Use Heal

## 📖 How It Works

### Game Loop

```typescript
function update(deltaTime) {
  // 1. Process input
  inputHandler.update();

  // 2. Update game logic
  player.update(deltaTime);
  monster.update(deltaTime); // Runs FSM

  // 3. Update UI
  uiManager.updateAll();

  // 4. Render
  renderer.render(scene, camera);
}
```

### Monster AI State Transitions

```
Idle → (player in range) → Chase
Chase → (player too far) → Idle
Chase → (player in attack range) → Attack
Attack → (player out of range) → Chase
Any → (player dead) → Idle
```

### Skill Execution Flow

```
Player presses [1]
  → InputHandler captures key
    → Player.useSkill('attack')
      → SkillManager.useSkill('attack')
        → DecisionTree.execute()
          → All checks pass ✅
            → Execute skill
            → Consume energy
            → Apply cooldowns
```

## 🎯 Key Implementation Details

### 1. Coordinate System

- Uses 2D distance calculation on XZ plane (ignoring Y axis)
- Simplifies combat math while maintaining 3D visuals

### 2. Animation Transitions

- Ready for Three.js `AnimationMixer` integration
- State changes should trigger `crossFadeTo()` for smooth transitions

### 3. Energy System

- Player: 100 max energy, regenerates 10/second
- Skills consume energy on use
- Must have enough energy to cast

### 4. Cooldown System

- **Global Cooldown (GCD)**: 1 second, affects all skills
- **Individual Cooldowns**: Per-skill timers
- Both must be ready to cast

## 🔧 Extending the System

### Adding a New Monster State

```typescript
fsm.addState({
  name: "Patrol",
  enter: () => {
    /* Setup patrol route */
  },
  update: (dt) => {
    /* Move along route */
  },
  exit: () => {
    /* Cleanup */
  },
});
```

### Adding a New Skill

```typescript
skillManager.skills.set("fireball", {
  name: "Fireball",
  energyCost: 25,
  damage: 30,
  range: 10,
  cooldown: 2,
  execute: (player) => {
    // Cast fireball logic
  },
});
```

### Adding New Decision Conditions

```typescript
DecisionTree.createCondition(
  () => player.hasBuff("buffName"),
  trueNode,
  falseNode,
);
```

## 📝 Next Steps (MVP+)

- [ ] Add more monster types with different AI behaviors
- [ ] Implement buff/debuff system
- [ ] Add combo system for skill chains
- [ ] Particle effects for skills
- [ ] Sound effects and music
- [ ] Multiple monsters with aggro system
- [ ] Equipment system affecting stats
- [ ] Skill tree progression

## 🐛 Known Limitations

- No animation system yet (placeholder meshes)
- Simplified 2D movement
- Single monster instance
- Basic collision detection
- No network/multiplayer support

## 📚 References

- [Three.js Documentation](https://threejs.org/docs/)
- [FSM Pattern](https://gameprogrammingpatterns.com/state.html)
- [Behavior Trees in Game AI](<https://en.wikipedia.org/wiki/Behavior_tree_(artificial_intelligence,_robotics_and_control)>)
- See `BEHAVIOR_TREE.md` for detailed behavior tree explanation

## 📄 License

MIT License - Feel free to use this project for learning and development!

---

Built with ❤️ using Three.js, TypeScript, and game design patterns
