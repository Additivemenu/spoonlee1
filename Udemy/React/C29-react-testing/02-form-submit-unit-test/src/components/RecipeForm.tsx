// RecipeForm.tsx

import styled from "@emotion/styled";
import { useForm, useFieldArray } from "react-hook-form";

import { FieldSet } from "./FieldSet";
import { Field } from "./Field";
import { Recipe } from "./types";

interface Props {
  saveData: (data: Recipe) => void;
}

export const RecipeForm = ({ saveData }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Recipe>();
  // again, a hook from react-hook-form that helps us manage arrays of fields
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const submitForm = (formData: Recipe) => {
    console.log(formData);
    saveData(formData);
  };

  return (
    <Container>
      <h1>New recipe</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet label="Basics">
          <Field label="Name" error={errors.name?.message}>
            {/* <Input type="text" name="name" id="name" /> */}
            <Input
              {...register("name", { required: "Recipe name is required" })}
              type="text"
              id="name"
            />
          </Field>
          {/* <Field label="Picture" error={errors.picture}>
            <Input
              {...register("picture", {
                required: "Recipe picture is required",
              })}
              type="file"
              id="picture"
            />
          </Field> */}
          <Field label="Description" error={errors.description?.message}>
            {/* <TextArea name="description" id="description" rows={10} /> */}
            <TextArea
              {...register("description", {
                maxLength: {
                  value: 100,
                  message: "Description cannot be longer than 100 characters",
                },
              })}
              id="description"
              rows={10}
            />
          </Field>
          <Field label="Servings" error={errors.amount?.message}>
            {/* <Input type="number" name="amount" id="amount" /> */}
            <Input
              {...register("amount", {
                valueAsNumber: true, //  the input value will be converted to a number before being submitted.
                max: {
                  value: 10,
                  message: "Maximum number of servings is 10",
                },
              })}
              type="number"
              id="amount"
            />
          </Field>
        </FieldSet>
        {/* ! dynamic form */}
        <FieldSet label="Ingredients">
          {fields.map((field, index) => {
            return (
              <Row key={field.id}>
                <Field label="Name">
                  <Input
                    type="text"
                    {...register(`ingredients.${index}.name`)}
                    id={`ingredients[${index}].name`}
                  />
                </Field>
                <Field label="Amount">
                  <Input
                    type="text"
                    {...register(`ingredients.${index}.amount`)}
                    defaultValue={field.amount}
                    id={`ingredients[${index}].amount`}
                  />
                </Field>
                {/* action  */}
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove ingredient ${index}`} // for accessibility
                >
                  &#8722;
                </Button>
              </Row>
            );
          })}
          {/* action */}
          <Button
            type="button"
            onClick={() => append({ name: "", amount: "" })}
          >
            Add ingredient
          </Button>
        </FieldSet>

        <Field>
          <Button variant="primary">Save</Button>
        </Field>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 4px 11px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  font-size: 14px;
  cursor: pointer;
  padding: 0.6em 1.2em;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  margin-right: auto;
  background-color: ${({ variant }) =>
    variant === "primary" ? "#3b82f6" : "white"};
  color: ${({ variant }) => (variant === "primary" ? "white" : "#213547")};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > * {
    margin-right: 20px;
  }

  button {
    margin: 25px 0 0 8px;
  }
`;
