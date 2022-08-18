import { Button, Stack, Typography } from "@mui/material";
import { open } from "@tauri-apps/api/dialog";
import React from "react";

interface PickFileProps {
  file: string;
  setFile: any;
}

export const handlePickFile = async () => {
  const selected = await open({
    filters: [{ name: "Fastboot Flash Files", extensions: ["img"] }],
  });

  return selected;
};

const PickFile: React.FC<PickFileProps> = ({ file, setFile }) => {
  return (
    <Stack direction="row" gap={1}>
      <Button
        variant="contained"
        onClick={async () => {
          setFile(await handlePickFile());
        }}
      >
        Select
      </Button>
      <Typography>{file}</Typography>
    </Stack>
  );
};

export default PickFile;
