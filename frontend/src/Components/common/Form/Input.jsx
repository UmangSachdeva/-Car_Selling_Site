import { ThemeProvider } from "@emotion/react";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { theme } from "../../../theme/themeProvider";
import styled from "@emotion/styled";

function Input(props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log(props.name);

  const error = get(errors, props.name);

  console.log(error);
  console.log(errors);

  return (
    <div {...props.container}>
      <ThemeProvider theme={theme}>
        <Controller
          control={control}
          name={props.name}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <TextField
              className="w-full"
              value={value}
              name={name}
              error={error}
              id="outlined-basic"
              label="Outlined"
              onChange={onChange}
              variant="outlined"
              {...props}
            />
          )}
        />
      </ThemeProvider>
    </div>
  );
}

export default Input;
