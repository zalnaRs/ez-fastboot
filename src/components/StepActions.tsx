import { ArrowBackRounded } from "@mui/icons-material";
import { Stack, IconButton, Button } from "@mui/material";
import React from "react";

interface StepActionsProps {
  setCurrentStep: any;
  disabled: boolean;
  noBack?: boolean;
  noNext?: boolean;
}

const StepActions: React.FC<StepActionsProps> = ({
  noBack,
  disabled,
  setCurrentStep,
  noNext,
}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {!noBack && (
        <IconButton
          aria-label="back"
          onClick={() => setCurrentStep((cur: any) => cur - 1)}
        >
          <ArrowBackRounded />
        </IconButton>
      )}
      {!noNext && (
        <Button
          onClick={() => setCurrentStep((cur: any) => cur + 1)}
          variant="contained"
          disabled={disabled}
        >
          Next
        </Button>
      )}
    </Stack>
  );
};

export default StepActions;
