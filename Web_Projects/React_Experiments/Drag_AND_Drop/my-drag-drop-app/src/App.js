import "./App.css";
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
      <DraggableTable />
    </div>
  );
}

export default App;
