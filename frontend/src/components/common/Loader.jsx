import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SpinnerRing = ({ size = 40, color = '#2563eb', thickness = 3 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <circle
      cx={size / 2} cy={size / 2} r={size / 2 - thickness}
      fill="none" stroke={color} strokeWidth={thickness} strokeOpacity={0.15}
    />
    <motion.circle
      cx={size / 2} cy={size / 2} r={size / 2 - thickness}
      fill="none" stroke={`url(#spinnerGrad-${size})`} strokeWidth={thickness}
      strokeLinecap="round"
      strokeDasharray={`${Math.PI * (size - thickness * 2) * 0.72} ${Math.PI * (size - thickness * 2)}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      style={{ originX: `${size / 2}px`, originY: `${size / 2}px` }}
    />
    <defs>
      <linearGradient id={`spinnerGrad-${size}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
  </svg>
);

const Loader = ({ fullPage = false, message = 'Loading...' }) => {
  if (fullPage) {
    return (
      <div className="loader-overlay">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          style={{ textAlign: 'center' }}
        >
          <SpinnerRing size={52} thickness={4} />
          <Typography variant="body2" sx={{ mt: 2, color: '#64748b', fontWeight: 500 }}>
            {message}
          </Typography>
        </motion.div>
      </div>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, gap: 2 }}>
      <SpinnerRing size={40} thickness={3.5} />
      <Typography variant="body2" color="text.secondary">{message}</Typography>
    </Box>
  );
};

export default Loader;
