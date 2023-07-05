import { Command } from '@tauri-apps/api/shell';
import { useAtom } from 'jotai';
import React, { PropsWithChildren, useEffect } from 'react';
import { loadingAtom, logsAtom } from '../store/jotai';

let setLoading: any;
let setLogs: any;

export const runCommand = async (
  title: string,
  cmd: string,
  args?: string | string[]
) => {
  await new Promise<string | void>((resolve, reject) => {
    const command = new Command(cmd, args);
    let data = '';
    command.spawn().then((child) => {
      command.stdout.on('data', (v) => {
        data += `\n${v}`;
        setLogs((cur: string) => (cur += `\n${v}`));
        setLoading((loading: any) => ({
          ...loading,
          open: true,
          text: data,
          title: title,
          cancel: () => {
            setLoading({
              title: '',
              text: '',
              cancel: null,
              open: false,
            });
            reject();
            child.kill();
          },
        }));
      });
      command.stderr.on('data', (v) => {
        data += `\n${v}`;
        setLogs((cur: string) => (cur += `\n${v}`));
        setLoading((loading: any) => ({
          ...loading,
          open: true,
          text: data,
          title: title,
          cancel: () => {
            setLoading({
              title: '',
              text: '',
              cancel: null,
              open: false,
            });
            reject();
            child.kill();
          },
        }));
      });
      command.on('close', (v) => {
        resolve(data);
        setLoading((loading: any) => ({
          ...loading,
          open: false,
          text: data,
          title: title,
          cancel: () => {
            setLoading({
              title: '',
              text: '',
              cancel: null,
              open: false,
            });
            reject();
            child.kill();
          },
        }));
      });
    });
  });
};

const ShellProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [_, v] = useAtom(loadingAtom);
  const [logs, _setLogs] = useAtom(logsAtom);

  useEffect(() => {
    setLoading = v;
    setLogs = _setLogs;
  }, []);

  return <>{children}</>;
};

export default ShellProvider;
