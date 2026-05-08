import React, { useState } from 'react';
import {
  TextField, InputAdornment, IconButton, Alert, Box, Typography, Divider,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';
import SpeedIcon from '@mui/icons-material/Speed';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import CustomButton from '../ui/CustomButton';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const features = [
  { icon: <VerifiedIcon />, text: 'Company verification in 24 hrs' },
  { icon: <BusinessIcon />, text: 'Rich verified business profiles' },
  { icon: <SpeedIcon />, text: 'Streamlined 3-step registration' },
];

const FloatingShape = ({ size, top, left, right, bottom, color, delay = 0 }) => (
  <motion.div
    className="floating-shape"
    style={{
      width: size,
      height: size,
      top,
      left,
      right,
      bottom,
      background: color,
      position: 'absolute',
      borderRadius: '50%',
      opacity: 0.18,
      pointerEvents: 'none',
    }}
    animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      toast.success('Welcome back!');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="auth-split">
      {/* LEFT — Hero */}
      <div className="auth-split-left">
        <FloatingShape size={200} top="-60px" left="-60px" color="radial-gradient(circle, #2563eb, transparent)" delay={0} />
        <FloatingShape size={150} bottom="40px" right="-30px" color="radial-gradient(circle, #7c3aed, transparent)" delay={1.5} />
        <FloatingShape size={100} top="40%" left="10%" color="radial-gradient(circle, #06b6d4, transparent)" delay={3} />

        <motion.div
          className="auth-split-left-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.2rem',
                flexShrink: 0,
              }}
            >
              C
            </Box>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: '#fff', fontFamily: 'Poppins, Inter, sans-serif' }}
            >
              CompanyHub
            </Typography>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                color: '#fff',
                lineHeight: 1.2,
                mb: 2,
                fontFamily: 'Poppins, Inter, sans-serif',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
              }}
            >
              Register & Verify Your Business Fast
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.65)', mb: 4, lineHeight: 1.7 }}>
              Join thousands of businesses using CompanyHub to establish credibility and trust.
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'flex-start', width: '100%' }}>
            {features.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06b6d4',
                    flexShrink: 0,
                    '& svg': { fontSize: 16 },
                  }}
                >
                  {f.icon}
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                  {f.text}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </div>

      {/* RIGHT — Form */}
      <div className="auth-split-right">
        <motion.div
          style={{ width: '100%', maxWidth: 420 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, color: '#0f172a' }}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your CompanyHub account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}>
                        {showPassword
                          ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
                          : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -1 }}>
                <Typography
                  variant="caption"
                  color="primary"
                  fontWeight={600}
                  sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                  Forgot password?
                </Typography>
              </Box>

              <CustomButton
                type="submit"
                fullWidth
                loading={loading}
                sx={{
                  py: 1.6,
                  fontSize: '0.95rem',
                  background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                  '&:hover': { background: 'linear-gradient(90deg, #1d4ed8, #6d28d9)' },
                }}
              >
                Sign In
              </CustomButton>
            </Box>
          </form>

          <Divider sx={{ my: 3, color: '#94a3b8', fontSize: '0.8rem' }}>
            Don't have an account?
          </Divider>

          <Link to={ROUTES.REGISTER} style={{ display: 'block' }}>
            <CustomButton
              variant="outlined"
              fullWidth
              sx={{ py: 1.4, borderColor: '#e2e8f0' }}
            >
              Create a free account
            </CustomButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
