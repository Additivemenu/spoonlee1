import "./App.css";
import ErrorFallback from "./components/MyComponent/ErrorFallback";
import MyComponent from "./components/MyComponent";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
        console.log("Resetting the state of the app");
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}

export default App;
