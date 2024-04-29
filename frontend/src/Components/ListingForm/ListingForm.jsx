import React, { useState } from "react";
import Form from "../common/Form/Form";
import MultiStep from "react-multistep";
import StepOne from "./StepOne";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Check } from "@mui/icons-material";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "white",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "white",
    zIndex: 1,
    backgroundColor: ""
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;
  console.log(props);

  return (
    <CustomStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="w-[50px] h-[50px] flex justify-center items-center bg-dark-black rounded-full">
          <Check className="text-3xl rounded-full text-light-yellow" />
        </div>
      ) : (
        <div
          className={`relative w-[50px] h-[50px] bg-theme-yellow text-2xl font-bold text-dark-black rounded-full flex justify-center items-center z-0`}
        >
          {active && (
            <div className="absolute top-0 left-0 right-0 z-10 w-full h-full m-auto rounded-full animate-ping bg-theme-yellow"></div>
          )}

          {props.icon}
        </div>
      )}
    </CustomStepIconRoot>
  );
}

const steps = ["Company Details", "Car Location Details", "Car Details"];

function ListingForm() {
  const [step, setStep] = useState(1);

  const handleNextStep = (data) => {
    if (step < steps.length) {
      setStep((prev) => prev + 1);
    } else {
      console.log(data);
    }
  };

  const handlePreviousStep = (data) => {
    if (step - 1 > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4 py-10">
      <div className="flex flex-col items-start w-[80%] gap-2 text-left">
        <p className="text-3xl font-bold capitalize text-dark-black">
          List your car on our platform
        </p>
        <p className="text-base text-light-black">(*) are required fields</p>
      </div>
      <div className="flex justify-start flex-col gap-10 py-8 w-[80%]">
        <Stepper activeStep={step - 1} className="">
          {steps.map((label, index) => {
            const labelProps = {};
            if (index == 3) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Alert message
                </Typography>
              );

              labelProps.error = true;
            }

            return (
              <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon} {...labelProps}>
                  <p className="text-xl">{label}</p>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Form onSubmit={handleNextStep} className="flex flex-col w-full gap-4">
          {step == 1 && <StepOne title="Company Details" />}
          {step == 2 && <StepTwo title="Car Location" />}
          {step == 3 && <StepThree title="Car Details" />}

          <div className="flex justify-around">
            <Button
              variant="outlined"
              color="primary"
              className="px-4 py-2 rounded-lg text-dark-black"
              onClick={handlePreviousStep}
            >
              Prev
            </Button>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ListingForm;
