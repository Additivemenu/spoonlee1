import "./App.css";
import ReactiveFlow from "./components/canvas/ReactFlow";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "100px, 0px",
      }}
    >
      <div
        style={{ width: "500px", height: "500px", border: "1px solid black" }}
      >
        <ReactiveFlow />
      </div>
    </div>
  );
}

export default App;
