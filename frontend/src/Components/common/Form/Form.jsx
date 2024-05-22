import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function Form({ children, resolver, ...props }) {
  const getResolver = () => {
    if (resolver) {
      return {
        resolver: resolver,
        mode: "onChange",
        reValidateMode: "onChange"
      };
    } else {
      return {
        mode: "onChange",
        reValidateMode: "onChange"
      };
    }
  };

  const methods = useForm(getResolver());

  const onSubmitRequest = methods.handleSubmit((data) => {
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

      <DevTool control={methods.control} />
    </FormProvider>
  );
}

export default Form;
