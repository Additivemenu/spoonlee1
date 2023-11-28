
import './App.css';
import React, { useState } from 'react';

function App() {
 // State to control the background color
 const [isActive, setIsActive] = useState(false);

 // Function to toggle the state
 const toggleColor = () => {
     setIsActive(!isActive);
 };

 // Determine the button's class based on the state
 const buttonClass = isActive ? 'bg-blue-500' : 'bg-red-500';

 return (
     <div className="p-4">
         <button 
             className={`text-white font-bold py-2 px-4 rounded ${buttonClass}`}
             onClick={toggleColor}
         >
             Click Me
         </button>
     </div>
 );
}

export default App;
