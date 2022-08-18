import { atom } from "jotai";
import { Device } from "../types";

export const devicesAtom = atom<Device[]>([]);
export const logsAtom = atom("");
export const loadingAtom = atom({
  cancel: null,
  open: false,
  title: "",
  text: "",
} as {
  cancel: any;
  open: boolean;
  title: string;
  text: string;
});
export const pageAtom = atom(0);
