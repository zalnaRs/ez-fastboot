import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface SelectPartitionProps {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const partitions = [
  "System",
  "Recovery",
  "Boot",
  "Recovery-RamDisk",
  "Boot_A",
  "Boot_B",
  "Cache",
  "Userdata",
];

const SelectPartition: React.FC<SelectPartitionProps> = ({
  value,
  onChange,
}) => {
  const [custom, setCustom] = useState(false);

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="partition-label">Partition</InputLabel>
      <Select
        labelId="partition-label"
        value={value}
        onChange={onChange as any}
      >
        {partitions.map((element, index) => (
          <MenuItem
            key={index}
            onClick={() => setCustom(false)}
            value={element.toLowerCase()}
          >
            {element}
          </MenuItem>
        ))}
        <MenuItem onClick={() => setCustom(true)} value={"custom"}>
          Custom
        </MenuItem>
      </Select>

      {custom && (
        <TextField
          sx={{ mt: 2 }}
          size="small"
          label="Custom Partition"
          value={value}
          onChange={onChange}
        />
      )}
    </FormControl>
  );
};

export default SelectPartition;
