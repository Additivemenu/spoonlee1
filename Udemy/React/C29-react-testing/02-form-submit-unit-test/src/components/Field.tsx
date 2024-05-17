// Field.js

import React from "react";

interface FieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactElement;
}

/**
 * a wrapper for input element with label and error message
 * @param param0
 * @returns
 */
export const Field = ({ label, htmlFor, error, children }: FieldProps) => {
  const id = getChildId(children);

  return (
    <div className="form-field">
      {label && <label htmlFor={id}>{label}</label>}
      {children}
      {error && (
        <div role={"alert"} className="error" style={{ color: "red" }}>
          {error}
        </div>
      )}
    </div>
  );
};

function getChildId(children: React.ReactElement) {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
}

// function getChildId(children: React.ReactNode): string | undefined {
//   if (React.isValidElement(children)) {
//     return children.props.id;
//   }
//   return undefined;
// }
