import * as React from "react";
import { motion } from "framer-motion";

// ! This is an object that defines the different states of the animation.
const variants = {
  open: {
    y: 0, // This sets the final vertical position to 0 when the animation is in the open state. The frame of reference for y is the element's initial position when the animation starts.
    opacity: 1, // This sets the final opacity to 1 (fully visible) when the animation is in the open state.
    transition: {
      // Defines how the transition to this state should occur.
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i }: { i: number }) => {
  const style = { border: `2px solid ${colors[i]}` };

  return (
    <motion.li
      variants={variants}
      whileHover={{
        scale: 1.1,
        // y: -100,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style} />
      <div className="text-placeholder" style={style} />
    </motion.li>
  );
};
