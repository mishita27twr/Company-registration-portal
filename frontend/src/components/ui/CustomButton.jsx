import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const CustomButton = ({
  children,
  loading = false,
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  startIcon,
  endIcon,
  size = 'medium',
  sx = {},
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      size={size}
      sx={{
        position: 'relative',
        minWidth: 100,
        ...sx,
      }}
    >
      {loading ? (
        <>
          <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
