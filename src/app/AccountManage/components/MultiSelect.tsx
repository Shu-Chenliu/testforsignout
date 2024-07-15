"use client";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
type SelectionProps={
  schools:string[],
  schoolName:string[],
  onChange:(event:SelectChangeEvent<string[]>)=>void,
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function Selection({schools,onChange,schoolName}:SelectionProps) {
  const theme = useTheme();
  return (
    <div className=''>
      <FormControl sx={{ width: 150 }} size="small">
        <InputLabel id="demo-multiple-name-label">School</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={schoolName}
          onChange={onChange}
          input={<OutlinedInput label="School" />}
          MenuProps={MenuProps}
        >
          {schools.map((school) => (
            <MenuItem
              key={school}
              value={school}
              style={getStyles(school, schoolName, theme)}
            >
              {school}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
