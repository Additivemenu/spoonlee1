import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  example: string;
};

const InputComponent: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("example")} placeholder="Enter text" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputComponent;
