import React from "react";
import { useForm, FormProvider } from "react-hook-form";

function Form({ children, ...props }) {
  const methods = useForm();
  const onSubmitRequest = methods.handleSubmit((data) => {
    console.log(data);
    props.onSubmit(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        {...props}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitRequest();
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
