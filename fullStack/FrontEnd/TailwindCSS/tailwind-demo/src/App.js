import React from 'react';
import './App.css'; // Assuming Tailwind CSS is imported here

// A simple React component
const SimpleComponent = () => {
  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0">
        {/* Icon or image can go here */}
      </div>
      <div>
        <div className="text-xl font-medium text-red-500">Simple React Component</div>
        <p className="text-gray-500">Using Tailwind CSS for styling</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Using the SimpleComponent */}
        <SimpleComponent />
      </header>
    </div>
  );
}

export default App;
