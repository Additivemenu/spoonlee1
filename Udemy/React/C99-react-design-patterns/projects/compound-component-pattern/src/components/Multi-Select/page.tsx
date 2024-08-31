import React, { useState } from "react";
import MultiSelect from "./index";

const HEADER_OPTIONS = [
  "Column Name 1",
  "Column Name 2",
  "Column Name 3",
  "Column Name 4",
];

const MultiSelectPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 我们只需把state 扔给MultiSelect组件，然后它会处理剩下的事情
  const [headerOptions, setHeaderOptions] = useState<string[]>(HEADER_OPTIONS);

  const handleAddNewHeaderOption = () => {
    setHeaderOptions([
      ...headerOptions,
      `Column Name ${headerOptions.length + 1}`,
    ]);
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
  };

  const handleRestoreHeader = () => {
    setHeaderOptions(HEADER_OPTIONS);
  };

  return (
    <div className="p-4">
      <h2>Multi-Select Page</h2>

      <div className="flex space-x-3">
        <button onClick={handleAddNewHeaderOption} className="my-btn-primary">
          add
        </button>
        <button onClick={handleClearAll} className="my-btn-primary">
          clear all selection
        </button>

        <button onClick={handleRestoreHeader} className="my-btn-primary">
          restore header
        </button>
      </div>

      {/* 精彩的在这里! 我们在外面只需要把selectedOptions, setSelectedOptions喂给Compound component, 它会自动handle剩下的事情 */}
      <MultiSelect
        selectedValues={selectedOptions}
        onChange={setSelectedOptions}
      >
        {headerOptions.map((header) => (
          <MultiSelect.Option key={header} value={header}>
            {/* 这里children相当于一个插槽, 具体插到哪里是由写MultiSelect.Option的人决定的 */}
            <div className="border border-slate-600 p-2">{header}</div>
          </MultiSelect.Option>
        ))}
      </MultiSelect>

      <div className="mt-4">
        <h3>Selected Options Results:</h3>
        <ul>
          {selectedOptions.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelectPage;
