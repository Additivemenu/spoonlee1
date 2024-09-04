import React from "react";

const MyComponent: React.FC = () => {
  const handleClick = () => {
    throw new Error("Oops! Something went wrong.");
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <button onClick={handleClick}>Trigger Error</button>
    </div>
  );
};

export default MyComponent;
