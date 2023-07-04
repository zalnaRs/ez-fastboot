import { AddRounded, DeleteRounded } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import SelectPartition from '../components/SelectPartition';
import { runCommand } from '../lib/Shell';

const Wipe: React.FC = () => {
  const [partitions, setPartitions] = useState(['system']);

  const handleChange = (index: number, value: string) => {
    const _partitions = [...partitions];
    _partitions[index] = value;
    setPartitions(_partitions);
  };

  const handleDelete = (index: number) => {
    const _partitions = [...partitions];
    _partitions.splice(index, 1);
    setPartitions(_partitions);
  };

  const handleAdd = () => {
    const _partitions = [...partitions];
    _partitions.push('system');
    setPartitions(_partitions);
  };

  return (
    <Stack sx={{ padding: 2 }}>
      <Alert severity="warning">
        <AlertTitle>Dangerous Actions Ahead!</AlertTitle>
        <Typography>
          Wiping <strong>necessary</strong> partitions may cause your device to
          misbehave!
          <br /> Anything you do here is at your <strong>own risk</strong>!
        </Typography>
      </Alert>

      <List>
        {partitions.map((partition, index) => (
          <ListItem key={index}>
            <SelectPartition
              onChange={(e) => handleChange(index, e.target.value)}
              value={partition}
            />
            <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
              <DeleteRounded />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button startIcon={<AddRounded />} onClick={() => handleAdd()}>
        Add Partition
      </Button>
      <Alert severity="warning" sx={{ marginTop: 2 }}>
        <AlertTitle>
          Can Cause <strong>Inreversible</strong> Damage!
        </AlertTitle>
        <Button
          variant="contained"
          onClick={async () => {
            for (const i in partitions) {
              const element = partitions[i];
              await runCommand(`Wiping ${element}`, 'fastboot', [
                'erase',
                element,
              ]);
            }
          }}
        >
          Wipe
        </Button>
      </Alert>
    </Stack>
  );
};

export default Wipe;
