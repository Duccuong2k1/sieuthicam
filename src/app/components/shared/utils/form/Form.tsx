import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";


interface FormProps {
  onSubmit: (data: FieldValues) => void;
  children: React.ReactNode;
  className?:any;
  
}

const Form: React.FC<FormProps> = ({ onSubmit, children ,className = "", ...props }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
