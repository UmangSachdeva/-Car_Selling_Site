import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { theme } from "../../../theme/themeProvider";

function Dropdown({ options, ...props }) {
  const { control } = useFormContext();

  return (
    <ThemeProvider theme={theme}>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: !props.noValidate }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <FormControl {...props}>
            <InputLabel id={props.name} className="capitalize">
              {props.label}
            </InputLabel>
            <Select
              labelId={props.name}
              onChange={onChange}
              id="demo-simple-select"
              defaultValue={value}
              label="Age"
              error={error}
              name={name}
              inputRef={ref}
              className="text-left text-dark-black"
              helperText={error?.message}

              {...props}
            >
              {options.map((opt) => (
                <MenuItem className="text-dark-black" value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
            <p className="text-xs text-left capitalize text-[#d32f2f] mx-[14px] mt-[3px]">{error?.message}</p>
          </FormControl>
        )}
      />
    </ThemeProvider>
  );
}

export default Dropdown;
