import React, { createContext, useContext, useState, ReactNode } from "react";

// Context to store the state of each card
interface CardContextType {
  title: string;
  isChecked: boolean;
  toggleChecked: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

interface CheckboxCardsProps {
  children: ReactNode;
  onSelectionChange: (selectedTitles: string[]) => void;
}

export const CheckboxCards: React.FC<CheckboxCardsProps> & {
  Card: React.FC<CardProps>;
  Title: React.FC<TitleProps>;
  Checkbox: React.FC;
} = ({ children, onSelectionChange }) => {
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);

  const handleToggle = (title: string, isChecked: boolean) => {
    setSelectedTitles((prev) => {
      const updatedTitles = isChecked
        ? [...prev, title]
        : prev.filter((t) => t !== title);
      onSelectionChange(updatedTitles);
      return updatedTitles;
    });
  };

  return <div>{children}</div>;
};

interface CardProps {
  title: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <CardContext.Provider value={{ title, isChecked, toggleChecked }}>
      <div style={{ border: "1px solid #ccc", padding: "1em", margin: "1em" }}>
        {children}
      </div>
    </CardContext.Provider>
  );
};

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h3>{children}</h3>;
};

const Checkbox: React.FC = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("Checkbox must be used within a Card");
  }

  const { title, isChecked, toggleChecked } = context;

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          toggleChecked();
          context.toggleChecked();
        }}
      />
      <label style={{ marginLeft: "8px" }}>{title}</label>
    </div>
  );
};

CheckboxCards.Card = Card;
CheckboxCards.Title = Title;
CheckboxCards.Checkbox = Checkbox;

export default CheckboxCards;
