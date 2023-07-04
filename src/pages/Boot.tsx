import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import StepActions from '../components/StepActions';
import PickFile from '../lib/PickFile';
import { runCommand } from '../lib/Shell';

const Boot: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<string | null>(null);

  return (
    <Stack direction="column" sx={{ padding: 2 }}>
      <Alert severity="warning">
        <AlertTitle>Dangerous Actions Ahead!</AlertTitle>
        <Typography>
          Booting <strong>incompatible</strong> images may cause your device to
          misbehave!
          <br /> Anything you do here is at your <strong>own risk</strong>!
        </Typography>
      </Alert>

      <Stepper activeStep={currentStep} orientation="vertical">
        <Step key={0} completed={file !== null}>
          <StepLabel>
            Select the file you want to flash {file && `- selected`}
          </StepLabel>
          <StepContent>
            <Stack direction="column">
              <PickFile file={file ?? ''} setFile={setFile} />
              <StepActions
                noBack
                setCurrentStep={setCurrentStep}
                disabled={!file}
              />
            </Stack>
          </StepContent>
        </Step>
        <Step key={2} completed={false}>
          <StepLabel>Boot!</StepLabel>
          <StepContent>
            <StepActions
              disabled={false}
              setCurrentStep={setCurrentStep}
              noNext
            />
            <Alert severity="warning">
              <AlertTitle>
                Can Cause <strong>Inreversible</strong> Damage!
              </AlertTitle>
              <Button
                variant="contained"
                onClick={async () => {
                  runCommand('Booting', 'fastboot', ['boot', file!]);
                }}
              >
                Boot
              </Button>
            </Alert>
          </StepContent>
        </Step>
      </Stepper>
    </Stack>
  );
};

export default Boot;
