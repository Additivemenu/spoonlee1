import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface IFormInput {
  name: string;
  email: string;
}

const AxiosForm: React.FC = () => {
  // hooks ---------------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // handlers ------------------------------------------------
  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await axios.post(
        "https://api.example.com/submit",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Submission successful", response.data);
      // Optionally handle further actions after successful submission
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  // jsx -----------------------------------------------------
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* name  */}
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name", { required: true })} />
        {errors.name && <span>Name field is required</span>}
      </div>
      {/* email */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email field is required</span>}
      </div>
      {/* submit */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AxiosForm;
