/**
 * common styles
 * demonstrating flexibility of css-in-js
 *
 * This is similar to design token in design system to some extent
 *
 */
export const redBg = {
  backgroundColor: "#f40",
  color: "#fff",
};

export function border(width = 2, color = "#333") {
  return {
    border: `${width}px solid ${color}`,
  };
}
