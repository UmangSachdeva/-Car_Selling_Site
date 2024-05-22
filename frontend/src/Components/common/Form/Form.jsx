import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function Form({ children, resolver, ...props }) {
  const getResolver = () => {
    if (resolver) {
      return {
        resolver: resolver,
      };
    } else {
      return {
        mode: "onChange",
      };
    }
  };

  const methods = useForm({
    resolver: resolver,
  });

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
