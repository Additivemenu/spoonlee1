import { Link } from "react-router-dom";

/**
 * root page for routing
 * @returns
 */
const App = () => {
  return (
    <div>
      <h1>Framer-motion example list</h1>
      <Link to="nav-menu">Navigation Menu Example</Link>
    </div>
  );
};

export default App;
