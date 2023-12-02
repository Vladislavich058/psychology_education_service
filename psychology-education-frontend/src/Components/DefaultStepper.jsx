import { Button, Step, Stepper } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function DefaultStepper({ size, activeIndex, activeId }) {
  const [activeStep, setActiveStep] = useState(Number(activeIndex));
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () =>
    !isLastStep &&
    (setActiveStep((cur) => cur + 1),
    router(`/topics/${size}/${activeStep + 1}/${Number(activeId) + 1}`));
  const handlePrev = () =>
    !isFirstStep &&
    (setActiveStep((cur) => cur - 1),
    router(`/topics/${size}/${activeStep - 1}/${Number(activeId) - 1}`));

  const router = useNavigate();

  const list = [];
  for (let i = 0; i < size; i++) {
    list.push(i);
  }

  return (
    <div className="w-full py-10 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        {list.map((index) => (
          <Step
            className="cursor-pointer"
            key={index}
            onClick={() => {
              setActiveStep(index);
              router(
                `/topics/${size}/${index}/${
                  Number(activeId) + index - Number(activeIndex)
                }`
              );
            }}
          >
            {index + 1}
          </Step>
        ))}
      </Stepper>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep} className="rounded-none">
          Назад
        </Button>
        <Button onClick={handleNext} disabled={isLastStep} className="rounded-none">
          Вперед
        </Button>
      </div>
    </div>
  );
}
