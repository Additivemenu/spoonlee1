# Quick Start Guide

## 🚀 Get Started in 30 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

## 🎮 First Time Playing?

### Controls

- **W/A/S/D**: Move your character (blue capsule)
- **Mouse**: Look around
- **Left Click**: Click the red monster to target it
- **1**: Use Attack skill (15 energy, 20 damage)
- **2**: Use Heavy Strike (30 energy, 40 damage, 3s cooldown)
- **3**: Use Heal (40 energy, heals 30 HP, 5s cooldown)

### What to Expect

When you start the game:

1. **You (Player)**: Blue capsule at the bottom
2. **Monster**: Red cube with yellow eyes at the top
3. **UI**: Top-left shows your stats
4. **Skills**: Bottom shows your skill bar

### Try This:

1. **Target the monster**: Click on the red cube
2. **Attack**: Press `1` or click the Attack button
3. **Watch the FSM**: See "Monster State" change from Idle → Chase → Attack
4. **Observe decision tree**: Try casting skills without energy and read console messages
5. **Survive**: Use Heal (`3`) when low on health!

## 🎯 Learning the Systems

### Monster AI (FSM)

Watch the "Monster State" indicator:

- **Idle**: Monster is standing still (you're far away)
- **Chase**: Monster runs towards you (you're in range)
- **Attack**: Monster hits you (you're close)

Move away with WASD and watch it transition back!

### Player Skills (Decision Tree)

Open browser console (F12) to see validation messages:

```
❌ Not enough energy (need 30, have 10)
❌ Target out of range (5.2m / 3m)
❌ Global cooldown active (0.5s remaining)
✅ ⚡ Player uses Attack!
```

## 📊 Understanding the Code

Start reading from:

1. **src/main.ts**: Game initialization
2. **src/core/StateMachine.ts**: FSM pattern
3. **src/core/DecisionTree.ts**: Decision validation
4. **src/entities/Monster.ts**: AI behavior
5. **src/systems/SkillManager.ts**: Skill logic

## 🔧 Quick Experiments

### Make the Monster Faster

In `src/entities/Monster.ts`:

```typescript
private moveSpeed: number = 5; // was 3
```

### Add More Energy

In `src/entities/Player.ts`:

```typescript
constructor(mesh: THREE.Mesh) {
  super(mesh, 100, 200); // was 100
}
```

### Change Attack Range

In `src/systems/SkillManager.ts`:

```typescript
this.skills.set("attack", {
  // ...
  range: 5, // was 3
});
```

## 🐛 Troubleshooting

### Port 3000 already in use?

```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or edit vite.config.ts to use different port
```

### TypeScript errors?

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Nothing appears?

- Check browser console for errors (F12)
- Make sure Three.js loaded correctly
- Try refreshing the page

## 📖 Next Steps

- Read `README.md` for full documentation
- Read `ARCHITECTURE.md` for system design details
- Experiment with adding new skills
- Try adding a new monster state (e.g., Flee)
- Add visual effects with Three.js particles

## 💡 Tips

1. **Energy Management**: Wait for energy to regenerate before spamming skills
2. **Kiting**: Move away while casting to avoid monster attacks
3. **Cooldowns**: Heavy Strike is powerful but has cooldown - use wisely!
4. **Console**: Keep browser console open to see game events

Enjoy building your combat system! 🎮✨
