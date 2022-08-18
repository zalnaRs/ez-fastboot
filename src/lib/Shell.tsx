import { Command } from "@tauri-apps/api/shell";
import { SetStateAction, useAtom } from "jotai";
import React, { PropsWithChildren, useEffect } from "react";
import LoadingDialog from "../components/LoadingDialog";
import { loadingAtom } from "../store/jotai";

let setLoading: any;

export const runCommand = async (
  title: string,
  cmd: string,
  args?: string | string[]
) => {
  await new Promise<string | void>((resolve, reject) => {
    const command = new Command(cmd, args);
    let data = "";
    command.spawn().then((child) => {
      command.stdout.on("data", (v) => {
        data += `\n${v}`;
        setLoading((loading: any) => ({
          ...loading,
          open: true,
          text: data,
          title: title,
          cancel: () => {
            setLoading({
              title: "",
              text: "",
              cancel: null,
              open: false,
            });
            reject();
            child.kill();
          },
        }));
      });
      command.stderr.on("data", (v) => {
        data += `\n${v}`;
        setLoading((loading: any) => ({
          ...loading,
          open: true,
          text: data,
          title: title,
          cancel: () => {
            setLoading({
              title: "",
              text: "",
              cancel: null,
              open: false,
            });
            reject();
            child.kill();
          },
        }));
      });
      command.on("close", (v) => {
        resolve(data);
        setLoading((loading: any) => ({
          ...loading,
          open: false,
          text: data,
          title: title,
          cancel: () => {
            setLoading({
              title: "",
              text: "",
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

  useEffect(() => {
    setLoading = v;
  }, []);

  return <>{children}</>;
};

export default ShellProvider;
