import {
  Card,
  Stack,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { runCommand } from "../lib/Shell";
import { devicesAtom } from "../store/jotai";

const DeviceInfo: React.FC = () => {
  const [devices, setDevices] = useAtom(devicesAtom);

  useEffect(() => {
    (async () => {
      const output = await runCommand("Getting Device Info", "fastboot", [
        "devices",
      ]);
      console.log(output);
    })();
  }, []);

  return (
    <Stack sx={{ padding: 2 }}>
      <Card variant="outlined">
        <CardHeader title="vayu" subheader="Fastboot" />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText>
                Bootloader Status: <Typography color="red">locked</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DeviceInfo;
