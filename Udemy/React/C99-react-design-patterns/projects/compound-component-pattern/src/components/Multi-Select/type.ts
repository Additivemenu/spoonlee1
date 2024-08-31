// ! this defines the interface that we expose to the outer world
// root component props
export type MultiSelectProps = {
  children: React.ReactNode;
  selectedValues: string[];
  onChange: (values: string[]) => void;
};

// inner component props
export type MultiSelectOptionProps = {
  value: string;
  children: React.ReactNode;
};

// context type
export type MultiSelectContextType = {
  selectedValues: string[];
  toggleValue: (value: string) => void;
} | null;
