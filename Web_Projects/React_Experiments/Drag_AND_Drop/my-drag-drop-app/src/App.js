import "./App.css";
import ComplexDraggableTable from "./components/ComplexDraggableTable/ComplexDraggableTable";
import DragDropChangePositionDemo from "./components/DragDropChangePositionDemo";
import DragDropDemo from "./components/DragDropDemo";
import DraggableGrid from "./components/DraggableGrid";
import DraggableTable from "./components/DraggableTable";

function App() {
  return (
    <div className="App">
      {/* <DragDropDemo /> */}
      {/* <DragDropChangePositionDemo /> */}
      {/* <DraggableGrid /> */}
      {/* <DraggableTable /> */}
      <div style={{ width: "1000px"}}>
        <ComplexDraggableTable />
      </div>
    </div>
  );
}

export default App;
