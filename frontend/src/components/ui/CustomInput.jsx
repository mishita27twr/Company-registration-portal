import React from 'react';
import { TextField, FormHelperText, FormControl } from '@mui/material';

const CustomInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  required = false,
  fullWidth = true,
  multiline = false,
  rows = 1,
  disabled = false,
  InputProps,
  sx = {},
  ...rest
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={!!error} sx={sx}>
      <TextField
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        error={!!error}
        InputProps={InputProps}
        size="medium"
        {...rest}
      />
      {(error || helperText) && (
        <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;
