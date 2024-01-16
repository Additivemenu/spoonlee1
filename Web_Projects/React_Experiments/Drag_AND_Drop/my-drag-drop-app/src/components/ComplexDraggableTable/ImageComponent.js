import React from "react";

// Component definition
const ImageComponent = ({ imageUrl, width, height }) => {
  return (
    <img src={imageUrl} alt="Custom" style={{ width: width, height: height }} />
  );
};

export default ImageComponent;
