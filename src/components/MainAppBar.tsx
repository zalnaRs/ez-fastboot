import { RefreshRounded, TerminalRounded } from "@mui/icons-material";
import {
  Toolbar,
  Button,
  AppBar,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Stack,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useState } from "react";
import Logs from "../modals/Logs";
import { pageAtom } from "../store/jotai";

const MainAppBar: React.FC = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [logsAnchorEl, setLogsAnchorEl] = useState<HTMLButtonElement | null>();

  return (
    <Toolbar variant="dense">
      <Tabs
        value={page}
        onChange={(_, newValue: number) => setPage(newValue)}
        scrollButtons
        variant="scrollable"
      >
        <Tab label="Device Info" />
        <Tab label="Flash" />
        <Tab label="Boot" />
        <Tab label="Wipe" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
      <Stack direction="row" sx={{ gap: 2 }}>
        <Tooltip title="Logs">
          <IconButton
            onClick={(e) => setLogsAnchorEl(e.currentTarget)}
            aria-label="Logs"
          >
            <TerminalRounded />
          </IconButton>
        </Tooltip>
        <Tooltip title="Refresh Devices">
          <IconButton aria-label="Refresh Devices">
            <RefreshRounded />
          </IconButton>
        </Tooltip>
      </Stack>
      <Logs
        anchorEl={logsAnchorEl!}
        onClose={() => setLogsAnchorEl(null)}
        open={Boolean(logsAnchorEl)}
      />
    </Toolbar>
  );
};

export default MainAppBar;
