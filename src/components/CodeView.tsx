import { Stack, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

const CodeView: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Typography
      color="white"
      whiteSpace="pre-wrap"
      sx={{ padding: 2, background: "black" }}
    >
      {children}
    </Typography>
  );
};

export default CodeView;
