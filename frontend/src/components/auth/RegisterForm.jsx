import React, { useState } from 'react';
import {
  TextField, InputAdornment, IconButton, Alert, Box, Typography, Divider,
  MenuItem,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import CustomButton from '../ui/CustomButton';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const FloatingShape = ({ size, top, left, right, bottom, color, delay = 0 }) => (
  <motion.div
    style={{
      width: size, height: size, top, left, right, bottom,
      background: color, position: 'absolute', borderRadius: '50%',
      opacity: 0.18, pointerEvents: 'none', zIndex: 1,
    }}
    animate={{ y: [0, -14, 0], scale: [1, 1.05, 1] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const steps = ['Create account', 'Complete profile', 'Register company'];

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser, loading, error } = useAuth();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      gender: 'o',
      signup_type: 'e',
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    const payload = {
      full_name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      gender: data.gender,
      mobile_no: data.mobile_no,
      signup_type: 'e',
    };

    const result = await registerUser(payload);

    if (result.success) {
      toast.success('Account created! Welcome aboard.');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-split-left">
        <FloatingShape size={220} top="-80px" right="-60px" color="radial-gradient(circle, #7c3aed, transparent)" delay={0} />
        <FloatingShape size={140} bottom="60px" left="-30px" color="radial-gradient(circle, #06b6d4, transparent)" delay={2} />
        <FloatingShape size={90} top="35%" right="10%" color="radial-gradient(circle, #2563eb, transparent)" delay={1} />

        <motion.div
          className="auth-split-left-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 44, height: 44, borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0,
              }}
            >
              C
            </Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: '#fff', fontFamily: 'Poppins, Inter, sans-serif' }}>
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
              sx={{ color: '#fff', lineHeight: 1.2, mb: 2, fontFamily: 'Poppins, Inter, sans-serif', fontSize: { xs: '1.8rem', md: '2rem' } }}
            >
              Start your verification journey today
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.65)', mb: 4, lineHeight: 1.7 }}>
              Create your account and get your company verified in just a few steps.
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <Box
                  sx={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: i === 0 ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : 'rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0,
                  }}
                >
                  {i === 0 ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : i + 1}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: i === 0 ? '#fff' : 'rgba(255,255,255,0.55)', fontWeight: i === 0 ? 600 : 400 }}
                >
                  {step}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </div>

      <div className="auth-split-right">
        <motion.div
          style={{ width: '100%', maxWidth: 420 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, color: '#0f172a' }}>
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start verifying your business with CompanyHub
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <TextField
                  label="First Name"
                  fullWidth
                  size="medium"
                  {...register('firstName', { required: 'Required' })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlinedIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  size="medium"
                  {...register('lastName', { required: 'Required' })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Box>

              <TextField
                label="Email Address"
                type="email"
                fullWidth
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
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

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <TextField
                  select
                  label="Gender"
                  fullWidth
                  defaultValue="o"
                  {...register('gender', { required: 'Gender is required' })}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  <MenuItem value="f">Female</MenuItem>
                  <MenuItem value="m">Male</MenuItem>
                  <MenuItem value="o">Other</MenuItem>
                </TextField>

                <TextField
                  label="Mobile Number"
                  fullWidth
                  placeholder="+919876543210"
                  {...register('mobile_no', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^\+[1-9]\d{7,14}$/,
                      message: 'Use format +919876543210',
                    },
                  })}
                  error={!!errors.mobile_no}
                  helperText={errors.mobile_no?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                {...register('password', {
                  required: 'Required',
                  minLength: { value: 8, message: 'Min 8 characters' },
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
                        {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                fullWidth
                {...register('confirmPassword', {
                  required: 'Required',
                  validate: (v) => v === password || 'Passwords do not match',
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowConfirm((v) => !v)} tabIndex={-1}>
                        {showConfirm ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

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
                Create Account
              </CustomButton>
            </Box>
          </form>

          <Divider sx={{ my: 2.5, color: '#94a3b8', fontSize: '0.8rem' }}>
            Already have an account?
          </Divider>

          <Link to={ROUTES.LOGIN} style={{ display: 'block' }}>
            <CustomButton variant="outlined" fullWidth sx={{ py: 1.4, borderColor: '#e2e8f0' }}>
              Sign in instead
            </CustomButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterForm;