import React, { createContext } from "react";
import {
  MultiSelectProps,
  MultiSelectOptionProps,
  MultiSelectContextType,
} from "./type";
import MultiSelectOption from "./multi-select-option";

export const MultiSelectContext = createContext<MultiSelectContextType>(null);

/**
 * ! compound components root, also context provider
 *
 * note the type declaration here, we used a type intersection to enable MultiSelect.Option
 *
 * @param param0
 * @returns
 */
const MultiSelect: React.FC<MultiSelectProps> & {
  Option: React.FC<MultiSelectOptionProps>;
} = ({ children, selectedValues, onChange }) => {
  // handler passed to children to toggle selected values
  const toggleValue = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(newValues);
  };

  return (
    <MultiSelectContext.Provider value={{ selectedValues, toggleValue }}>
      <div className="border rounded-lg p-2 min-h-[200px] overflow-auto">
        {children}
      </div>
    </MultiSelectContext.Provider>
  );
};

// Attach the Option component to the MultiSelect component
MultiSelect.Option = MultiSelectOption;

export default MultiSelect;
