import React, { Suspense, lazy, useEffect } from 'react';
import MainAppBar from './components/MainAppBar';
import {
  CircularProgress,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from '@mui/material';
import { useAtom } from 'jotai';
import { logsAtom, pageAtom } from './store/jotai';
import { getTauriVersion } from '@tauri-apps/api/app';
import LoadingDialog from './modals/Loading';
import ShellProvider from './lib/Shell';

const Flash = lazy(() => import('./pages/Flash'));
const Boot = lazy(() => import('./pages/Boot'));
const DeviceInfo = lazy(() => import('./pages/DeviceInfo'));
const Wipe = lazy(() => import('./pages/Wipe'));

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
        <CssBaseline />
        <LoadingDialog />
        <MainAppBar />

        <Suspense
          fallback={
            <Stack
              height={'100vh'}
              width={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <CircularProgress />
            </Stack>
          }
        >
          {page === 0 && <DeviceInfo />}
          {page === 1 && <Flash />}
          {page === 2 && <Boot />}
          {page === 3 && <Wipe />}
        </Suspense>
      </ThemeProvider>
    </ShellProvider>
  );
}

export default App;
