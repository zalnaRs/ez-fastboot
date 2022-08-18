import { Popover, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import CodeView from "../components/CodeView";
import { logsAtom } from "../store/jotai";

interface LogsProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
}

const Logs: React.FC<LogsProps> = ({ open, onClose, anchorEl }) => {
  const [logs] = useAtom(logsAtom);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Stack sx={{ padding: 1 }}>
        <Typography variant="h6">Logs</Typography>
        <CodeView>{logs}</CodeView>
      </Stack>
    </Popover>
  );
};

export default Logs;
