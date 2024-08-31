// src/MultiSelectOption.tsx
import React, { useContext } from "react";
import { MultiSelectContext } from "./multi-select";
import { MultiSelectOptionProps } from "./type";

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
  value,
  children,
}) => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("MultiSelectOption must be used within a MultiSelect");
  }

  const { selectedValues, toggleValue } = context;
  const isSelected = selectedValues.includes(value);

  const checkBox = (
    <div
      className={`w-6 h-6 flex justify-center items-center mr-3 rounded-full ${
        isSelected ? "bg-teal-500 text-white" : "bg-gray-200"
      }`}
    >
      {isSelected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );

  return (
    <div
      className={`flex items-center p-2 mb-2 cursor-pointer rounded-lg ${
        isSelected ? "bg-gray-100" : "bg-white"
      }`}
      onClick={() => toggleValue(value)}
    >
      {checkBox}
      {children}
    </div>
  );
};

export default MultiSelectOption;
