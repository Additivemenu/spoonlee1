# Project Structure Overview

## 📁 File Organization

```
2-wow-combat/
├── src/
│   ├── core/                    # Core game systems
│   │   ├── StateMachine.ts      # FSM implementation
│   │   └── DecisionTree.ts      # Decision tree for skills
│   │
│   ├── entities/                # Game entities
│   │   ├── Entity.ts            # Base entity class
│   │   ├── Player.ts            # Player with skills
│   │   └── Monster.ts           # Monster with AI
│   │
│   ├── systems/                 # Game systems
│   │   ├── SkillManager.ts      # Skill validation & execution
│   │   ├── InputHandler.ts      # Keyboard & mouse input
│   │   └── UIManager.ts         # UI updates
│   │
│   └── main.ts                  # Game initialization & loop
│
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite bundler config
└── README.md                    # Documentation
```

## 🔄 System Flow

### Game Loop

```
┌─────────────────────────────────────┐
│         main.ts (Game Loop)         │
└──────────────┬──────────────────────┘
               │
               ├──► InputHandler.update()
               │    └─► Process WASD & skill keys
               │
               ├──► Player.update(deltaTime)
               │    ├─► Movement
               │    ├─► Energy regen
               │    └─► SkillManager.update()
               │
               ├──► Monster.update(deltaTime)
               │    └─► StateMachine.update()
               │         ├─► Idle state
               │         ├─► Chase state
               │         └─► Attack state
               │
               ├──► UIManager.update()
               │    ├─► Update health bars
               │    ├─► Update energy bars
               │    └─► Update skill cooldowns
               │
               └──► Renderer.render()
```

### Monster AI State Machine

```
┌──────┐  player in range   ┌───────┐
│ Idle │ ──────────────────► │ Chase │
└──┬───┘                     └───┬───┘
   ▲                             │
   │ player too far              │ player close
   │                             │
   └─────────────────────────────┼───────────┐
                                 ▼           │
                             ┌────────┐      │
                             │ Attack │      │
                             └────────┘      │
                                             │
                          player dead ───────┘
```

### Player Skill Decision Tree

```
Player presses skill key
         │
         ▼
    Is GCD ready? ──No──► Show error
         │ Yes
         ▼
 Is skill on CD? ──Yes──► Show error
         │ No
         ▼
  Enough energy? ──No──► Show error
         │ Yes
         ▼
  Valid target? ──No──► Show error (if damage skill)
         │ Yes
         ▼
  Target in range? ──No──► Show error
         │ Yes
         ▼
   Execute Skill!
         ├─► Consume energy
         ├─► Apply damage/healing
         └─► Start cooldowns
```

## 🎯 Key Components

### 1. StateMachine (FSM)

```typescript
interface IState {
  name: string;
  enter(): void; // Called once when entering
  update(dt): void; // Called every frame
  exit(): void; // Called once when exiting
}
```

**Usage**: Monster AI behavior management

- Clean state transitions
- Easy to add new behaviors
- Predictable state flow

### 2. DecisionTree

```typescript
interface DecisionNode {
  evaluate(): boolean | string;
  trueNode?: DecisionNode;
  falseNode?: DecisionNode;
  action?: () => void;
}
```

**Usage**: Player skill validation

- Chain multiple conditions
- Clear error messages
- Extensible validation logic

### 3. Entity Base Class

```typescript
abstract class Entity {
  mesh: THREE.Mesh
  health, energy: number
  target: Entity | null

  takeDamage(amount)
  heal(amount)
  distanceTo(entity)
  abstract update(deltaTime)
}
```

**Usage**: Shared logic for all game objects

- Combat stats management
- 2D distance calculation (XZ plane)
- Polymorphic update method

## 🎨 Rendering vs Logic

### Rendering Layer (Three.js)

- Mesh creation and updates
- Animation playback (future)
- Particle effects (future)
- Camera movement
- Lighting

### Logic Layer (TypeScript)

- State management (FSM)
- Combat calculations
- AI decisions (Decision Tree)
- Input processing
- Game rules

**Benefits of Separation**:

- Logic can be tested without rendering
- Easy to add/change visuals
- Better performance (logic runs independently)
- Cleaner code organization

## 📊 Data Flow Example: Player Attacks Monster

```
1. User Input
   └─► InputHandler detects key '1'

2. Player Logic
   └─► Player.useSkill('attack')
       └─► SkillManager.useSkill('attack')

3. Decision Tree Validation
   ├─► ✓ GCD ready
   ├─► ✓ Skill off cooldown
   ├─► ✓ Has 15 energy
   ├─► ✓ Has target (monster)
   └─► ✓ Target in 3m range

4. Skill Execution
   ├─► Player.currentEnergy -= 15
   ├─► Monster.takeDamage(20)
   │   └─► Monster.currentHealth -= 20
   └─► Start cooldowns

5. Monster Response (FSM)
   └─► If in Idle state && player in range
       └─► Transition to Chase state
           └─► Next frame: Move towards player

6. UI Update
   ├─► Update player energy bar
   ├─► Update monster health bar
   └─► Show skill cooldown
```

## 🚀 Extension Points

Want to add new features? Here's where to start:

| Feature           | Files to Modify                                       |
| ----------------- | ----------------------------------------------------- |
| New skill         | `SkillManager.ts`                                     |
| New monster state | `Monster.ts` (add to FSM)                             |
| New entity type   | Create new class extending `Entity.ts`                |
| New input control | `InputHandler.ts`                                     |
| New UI element    | `UIManager.ts` + `index.html`                         |
| Buff system       | `Entity.ts` + `SkillManager.ts`                       |
| Animation         | `Monster.ts` + `Player.ts` (integrate AnimationMixer) |

## 🎓 Learning Path

1. **Start here**: Read `main.ts` to understand game initialization
2. **Core concepts**: Study `StateMachine.ts` and `DecisionTree.ts`
3. **Entities**: Check `Entity.ts`, `Player.ts`, `Monster.ts`
4. **Systems**: Explore `SkillManager.ts`, `InputHandler.ts`
5. **Experiment**: Modify values, add new skills/states

## 💡 Pro Tips

- State machines are perfect for **AI behavior** that needs clear states
- Decision trees are great for **validation logic** with multiple checks
- Keep **logic separate from rendering** for easier testing and debugging
- Use 2D distance (XZ plane) for simpler **combat calculations**
- Always check `isDead` before performing actions on entities
