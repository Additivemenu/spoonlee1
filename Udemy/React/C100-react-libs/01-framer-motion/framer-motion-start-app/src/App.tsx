import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { motion } from "framer-motion";

const cardVariants = {
  offscreen: { x: -300, opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  exit: {
    x: 300,
    opacity: 0,
    transition: { duration: 0.5 },
  },
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
      <motion.div className="card" variants={cardVariants}>
        <h2>Interactive Card</h2>
        <p>Drag me around, hover to scale up, and tap to scale down!</p>
      </motion.div>
    </motion.div>
  );
};

export default App;
