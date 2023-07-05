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
  Skeleton,
} from '@mui/material';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { runCommand } from '../lib/Shell';
import { devicesAtom } from '../store/jotai';

const DeviceInfo: React.FC = () => {
  const [devices, setDevices] = useAtom(devicesAtom);

  useEffect(() => {
    (async () => {
      const output = await runCommand('Getting Device Info', 'fastboot', [
        'devices',
      ]);
      console.log(output);
    })();
  }, []);

  return (
    <Stack sx={{ padding: 2 }}>
      <Card variant="outlined" sx={{ px: 2 }}>
        <Skeleton width={'full'}>
          <CardHeader title="vayu" subheader="Fastboot" />
        </Skeleton>
        <CardContent>
          <List disablePadding>
            <ListItem sx={{ display: 'flex', flexDirection: 'row' }}>
              <ListItemText sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography>Bootloader Status:</Typography>
                <Skeleton>
                  <Typography color="red">locked</Typography>
                </Skeleton>
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DeviceInfo;
