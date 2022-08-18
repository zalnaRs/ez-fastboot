import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import {
  FormControl,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Alert,
  AlertTitle,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import StepActions from "../../components/StepActions";
import PickFile from "../../lib/PickFile";
import { Command } from "@tauri-apps/api/shell";
import SelectPartition from "../../components/SelectPartition";
import { useAtom } from "jotai";
import { runCommand } from "../../lib/Shell";

const FlashSimple: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [partition, setPartition] = useState("");
  const [file, setFile] = useState(null);
  const [bootAfter, setBootAfter] = useState(false);

  return (
    <Stepper activeStep={currentStep} orientation="vertical">
      <Step key={0} completed={partition != ""}>
        <StepLabel>
          Select the partition to flash {partition != "" && `- ${partition}`}
        </StepLabel>
        <StepContent>
          <Stack direction="column">
            <SelectPartition
              value={partition}
              onChange={(e) => setPartition(e.target.value)}
            />

            <StepActions
              setCurrentStep={setCurrentStep}
              disabled={partition === ""}
              noBack
            />
          </Stack>
        </StepContent>
      </Step>
      <Step key={1} completed={file !== null}>
        <StepLabel>
          Select the file you want to flash {file && `- selected`}
        </StepLabel>
        <StepContent>
          <Stack direction="column">
            <PickFile file={file ?? ""} setFile={setFile} />
            <StepActions setCurrentStep={setCurrentStep} disabled={!file} />
          </Stack>
        </StepContent>
      </Step>
      <Step key={3} completed={false}>
        <StepLabel>Flash!</StepLabel>
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
            <FormControlLabel
              label="Also boot after flashing"
              control={
                <Checkbox
                  checked={bootAfter}
                  onChange={(e) => setBootAfter(e.target.checked)}
                  color="primary"
                />
              }
            />
            <Button
              variant="contained"
              onClick={async () => {
                await runCommand("Flashing", "fastboot", [
                  "flash",
                  partition!,
                  file!,
                ]);
                if (bootAfter) {
                  await runCommand("Booting", "fastboot", ["boot", file!]);
                }
              }}
            >
              Flash
            </Button>
          </Alert>
        </StepContent>
      </Step>
    </Stepper>
  );
};

export default FlashSimple;
