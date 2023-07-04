import {
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import FlashSimple from './Simple';

const Flash: React.FC = () => {
  const [type, setType] = useState('simple');

  return (
    <Stack direction="column" sx={{ padding: 2 }}>
      <Alert severity="warning">
        <AlertTitle>Dangerous Actions Ahead!</AlertTitle>
        <Typography>
          Flashing <strong>incompatible</strong> images may cause your device to
          misbehave!
          <br /> Anything you do here is at your <strong>own risk</strong>!
        </Typography>
      </Alert>

      <FormControl variant="filled" sx={{ m: 1, mb: 3, minWidth: 120 }}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value={'simple'}>Simple</MenuItem>
          <MenuItem value={'advanced'}>Advanced</MenuItem>
        </Select>
      </FormControl>

      {type === 'simple' && <FlashSimple />}
    </Stack>
  );
};

export default Flash;
