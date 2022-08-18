import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import CodeView from "./CodeView";
import { useAtom } from "jotai";
import { loadingAtom, logsAtom } from "../store/jotai";

const LoadingDialog: React.FC = () => {
  const [loading] = useAtom(loadingAtom);
  const [_, setLogs] = useAtom(logsAtom);

  useEffect(() => {
    setLogs((cur) => cur + "\n" + loading.text);
  }, [loading]);

  return (
    <Dialog open={loading.open} onClose={() => {}}>
      <LinearProgress variant="indeterminate" />
      <DialogTitle>{loading.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <CodeView>{loading.text}</CodeView>
        </DialogContentText>
      </DialogContent>
      {loading.cancel && (
        <DialogActions>
          <Button onClick={loading.cancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default LoadingDialog;
