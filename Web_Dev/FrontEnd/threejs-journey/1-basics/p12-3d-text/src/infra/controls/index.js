import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const createControl = ({
    camera,
    canvas
}) => {
  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  return controls;
};

export { createControl };
