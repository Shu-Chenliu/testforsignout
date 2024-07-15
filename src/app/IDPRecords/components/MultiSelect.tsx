"use client";
import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
type SelectionProps={
  semesters:string[],
  selected:string[],
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
function getStyles(s: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(s) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function Selection({semesters,onChange,selected}:SelectionProps) {
  const theme = useTheme();
  return (
    <div className=''>
      <FormControl sx={{ width: 150 }} size="small">
        {/* <InputLabel id="demo-multiple-name-label">School</InputLabel> */}
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selected}
          onChange={onChange}
          // input={<OutlinedInput label="搜尋時間" />}
          MenuProps={MenuProps}
        >
          {semesters.map((s) => (
            <MenuItem
              key={s}
              value={s}
              style={getStyles(s, selected, theme)}
            >
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
