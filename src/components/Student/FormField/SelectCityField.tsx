import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Control, useController } from "react-hook-form";

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectCityFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export function SelectCityField({ name, control, label, disabled, options }: SelectCityFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <FormControl
        fullWidth
        variant="outlined"
        size="small"
        margin="normal"
        disabled={disabled}
        error={invalid}
      >
        <InputLabel id={`${name}_label`}>{label}</InputLabel>
        <Select
          labelId={`${name}_label`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}
        </Select>

        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </>
  );
}
