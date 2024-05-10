import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
}

const FetchForm: React.FC = () => {
  // hooks ---------------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // handlers ------------------------------------------------
  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await fetch("https://api.example.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Submission successful", result);
      // Optionally handle further actions after successful submission
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  // jsx -----------------------------------------------------
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* name input */}
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name", { required: true })} />
        {errors.name && (
          <span style={{ color: "red" }}>Name field is required</span>
        )}
      </div>
      {/* email input */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span style={{ color: "red" }}>Email field is required</span>
        )}
      </div>
      {/* submit */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FetchForm;
