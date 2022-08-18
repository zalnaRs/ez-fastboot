import React, { Suspense, useEffect } from "react";
import MainAppBar from "./components/MainAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { useAtom } from "jotai";
import { loadingAtom, logsAtom, pageAtom } from "./store/jotai";
import Flash from "./pages/Flash";
import { getTauriVersion } from "@tauri-apps/api/app";
import LoadingDialog from "./components/LoadingDialog";
import { Provider as JotaiProvider } from "jotai";
import "./lib/Shell";
import ShellProvider from "./lib/Shell";
import Boot from "./pages/Boot";
import DeviceInfo from "./pages/DeviceInfo";
import Wipe from "./pages/Wipe";

function App() {
  const theme = createTheme();
  const [page] = useAtom(pageAtom);
  const [_, setLogs] = useAtom(logsAtom);

  useEffect(() => {
    (async () => {
      setLogs(
        `Started!\nversion: ${await getTauriVersion()}\nfastboot: unknown`
      );
    })();
  }, []);

  return (
    <ShellProvider>
      <ThemeProvider theme={theme}>
        <LoadingDialog />
        <MainAppBar />

        {page === 0 && <DeviceInfo />}
        {page === 1 && <Flash />}
        {page === 2 && <Boot />}
        {page === 3 && <Wipe />}
      </ThemeProvider>
    </ShellProvider>
  );
}

export default App;
