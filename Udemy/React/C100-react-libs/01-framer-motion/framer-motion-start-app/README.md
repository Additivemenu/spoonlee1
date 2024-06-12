Next: use react router to put multiple example in each apge



Let's create a more comprehensive example that showcases multiple features of Framer Motion, such as motion components, variants, gestures, and orchestration. We'll create a simple interactive card component that animates on hover, drag, and tap events, and uses variants for smooth transitions.

Here's the complete example:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import './App.css'; // Assuming you have some basic styling

const cardVariants = {
  offscreen: { x: -300, opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8
    }
  },
  exit: {
    x: 300,
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

const App = () => {
  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      animate="onscreen"
      exit="exit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
    >
      <motion.div
        className="card"
        variants={cardVariants}
      >
        <h2>Interactive Card</h2>
        <p>Drag me around, hover to scale up, and tap to scale down!</p>
      </motion.div>
    </motion.div>
  );
};

export default App;
```

### Explanation

1. **Motion Component**: We use `motion.div` instead of a regular `div` to apply animations.
2. **Variants**: The `cardVariants` object defines three states: `offscreen`, `onscreen`, and `exit`. Each state specifies different properties for the animation.
3. **Initial, Animate, and Exit Props**: These props control the animation states when the component mounts, updates, or unmounts.
4. **Gestures**: The `whileHover` and `whileTap` props add interactivity, scaling the card on hover and tap.
5. **Drag**: The `drag` prop makes the card draggable, and `dragConstraints` limits the dragging area.

### Basic Styling (App.css)

```css
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 300px;
  text-align: center;
}
```

### Detailed Breakdown

- **Motion Component**: `motion.div` is used to enable animations. The outer `motion.div` wraps the card and applies the hover, tap, and drag interactions.
- **Variants**: `cardVariants` defines animation states:
  - `offscreen`: The card starts off-screen to the left with opacity 0.
  - `onscreen`: The card animates to its normal position with opacity 1 using a spring animation.
  - `exit`: The card animates off-screen to the right with opacity 0 when it unmounts.
- **Initial, Animate, and Exit**: The card initializes in the `offscreen` state, animates to the `onscreen` state, and exits with the `exit` state.
- **Gestures**: `whileHover` scales the card up to 1.05, and `whileTap` scales it down to 0.95.
- **Drag**: The card is draggable within the constraints defined by `dragConstraints`.

This example combines various features of Framer Motion to create an interactive and animated card component. You can further customize and extend this example based on your needs.