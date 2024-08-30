import React from "react";
import CheckboxCards from "./init";

const CheckboxCardsDemo = () => {
  const handleSelectionChange = (selectedTitles: string[]) => {
    console.log("Selected Titles:", selectedTitles);
  };

  return (
    <>
      <h2>Checkbox cards multi-select compound component pattern </h2>
      <CheckboxCards onSelectionChange={handleSelectionChange}>
        <CheckboxCards.Card title="Card 1">
          <CheckboxCards.Title>Card 1 Title</CheckboxCards.Title>
          <CheckboxCards.Checkbox />
        </CheckboxCards.Card>

        <CheckboxCards.Card title="Card 2">
          <CheckboxCards.Title>Card 2 Title</CheckboxCards.Title>
          <CheckboxCards.Checkbox />
        </CheckboxCards.Card>

        <CheckboxCards.Card title="Card 3">
          <CheckboxCards.Title>Card 3 Title</CheckboxCards.Title>
          <CheckboxCards.Checkbox />
        </CheckboxCards.Card>
      </CheckboxCards>
    </>
  );
};

export default CheckboxCardsDemo;

/**
 * State Management: Each Card maintains its own isChecked state. When the checkbox is toggled, 
 *                   the state is updated, and the selected titles are managed in the CheckboxCards component.
 * Context: The CardContext provides the state and toggle function to the Checkbox component.
 */
