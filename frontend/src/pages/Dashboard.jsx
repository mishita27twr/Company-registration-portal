import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button,
  Avatar, Chip, LinearProgress, Divider,
} from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import ProfileCard from '../components/company/ProfileCard';
import CompanyDetails from '../components/company/CompanyDetails';
import { useCompany } from '../hooks/useCompany';
import { ROUTES } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import AnimatedPage, { staggerContainer, slideUpItem } from '../components/common/AnimatedPage';

const StatCard = ({ icon, label, value, color, bg, trend, delay = 0 }) => (
  <motion.div variants={slideUpItem}>
    <motion.div
      className="stat-card-premium"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ letterSpacing: '0.02em' }}>
            {label}
          </Typography>
          <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5, color: '#0f172a' }}>
            {value}
          </Typography>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <TrendingUpIcon sx={{ fontSize: 13, color: '#10b981' }} />
              <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Avatar
          sx={{
            backgroundColor: bg,
            color,
            width: 46,
            height: 46,
            borderRadius: '12px',
            '& svg': { fontSize: 22 },
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </motion.div>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useCompany();

  const displayName = user ? `${user.firstName || user.name || ''} ${user.lastName || ''}`.trim() || 'User' : 'User';
  const firstName = displayName.split(' ')[0];
  const today = formatDate(new Date().toISOString());

  const verifiedCount = [true, !!profile, !!(profile?.logoUrl), profile?.status === 'verified'].filter(Boolean).length;

  const stats = [
    { icon: <BusinessOutlinedIcon />, label: 'Company Status', value: profile ? (profile.status || 'Active') : 'Unregistered', color: '#2563eb', bg: '#eff6ff' },
    { icon: <VerifiedOutlinedIcon />, label: 'Verification', value: profile?.status === 'verified' ? 'Verified' : 'Pending', color: profile?.status === 'verified' ? '#10b981' : '#f59e0b', bg: profile?.status === 'verified' ? '#d1fae5' : '#fef3c7' },
    { icon: <AssignmentOutlinedIcon />, label: 'Documents', value: profile ? '2 / 3' : '0 / 3', color: '#7c3aed', bg: '#f5f3ff', trend: profile ? '+1 this week' : undefined },
    { icon: <PendingOutlinedIcon />, label: 'Pending Actions', value: profile ? '1' : '3', color: '#ef4444', bg: '#fef2f2' },
  ];

  return (
    <DashboardLayout>
      <AnimatedPage>
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="welcome-banner">
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', fontSize: '0.72rem' }}>
                {today}
              </Typography>
              <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', mt: 0.5, mb: 1 }}>
                Welcome back, {firstName} 👋
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mb: 2.5, maxWidth: 480 }}>
                Here's your company verification overview. {profile ? 'Your profile is looking great!' : 'Complete your company registration to get started.'}
              </Typography>
              {!profile && (
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<EastIcon fontSize="small" />}
                  onClick={() => navigate(ROUTES.COMPANY_REGISTRATION)}
                  sx={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    '&:hover': { background: 'rgba(255,255,255,0.25)', boxShadow: 'none', transform: 'translateY(-1px)' },
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '10px',
                    px: 2.5,
                  }}
                >
                  Register Company
                </Button>
              )}
            </Box>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {stats.map((s) => (
              <Grid item xs={12} sm={6} lg={3} key={s.label}>
                <StatCard {...s} />
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Profile card */}
        <motion.div variants={slideUpItem} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <ProfileCard company={profile} user={user} />
        </motion.div>

        {/* Details + Progress */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                    <Typography variant="h6" fontWeight={700}>Company Details</Typography>
                    {profile && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(ROUTES.SETTINGS)}
                        sx={{ borderRadius: '8px', textTransform: 'none', fontSize: '0.8rem', borderColor: '#e2e8f0' }}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </Box>
                  <CompanyDetails company={profile} loading={loading} />
                  {!profile && !loading && (
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        onClick={() => navigate(ROUTES.COMPANY_REGISTRATION)}
                        startIcon={<AddBusinessOutlinedIcon />}
                        sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 600, background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }}
                      >
                        Register Your Company Now
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} mb={2.5}>
                    Verification Progress
                  </Typography>
                  {[
                    { label: 'Account Created', done: true },
                    { label: 'Company Registered', done: !!profile },
                    { label: 'Documents Uploaded', done: !!(profile?.logoUrl) },
                    { label: 'Verification Complete', done: profile?.status === 'verified' },
                  ].map((step, i) => (
                    <Box key={step.label}>
                      <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + i * 0.08 }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.4 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                background: step.done
                                  ? 'linear-gradient(135deg, #10b981, #059669)'
                                  : '#f1f5f9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: step.done ? '0 2px 8px rgba(16,185,129,0.3)' : 'none',
                              }}
                            >
                              <Typography variant="caption" fontWeight={700} color={step.done ? '#fff' : '#94a3b8'}>
                                {step.done ? '✓' : i + 1}
                              </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={step.done ? 600 : 400} color={step.done ? '#0f172a' : '#94a3b8'}>
                              {step.label}
                            </Typography>
                          </Box>
                          <Chip
                            label={step.done ? 'Done' : 'Pending'}
                            size="small"
                            sx={{
                              fontSize: '0.68rem', fontWeight: 600, height: 22,
                              backgroundColor: step.done ? '#d1fae5' : '#f8fafc',
                              color: step.done ? '#065f46' : '#94a3b8',
                              border: step.done ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                            }}
                          />
                        </Box>
                      </motion.div>
                      {i < 3 && <Divider sx={{ borderColor: '#f8fafc' }} />}
                    </Box>
                  ))}

                  <Box sx={{ mt: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        Overall Progress
                      </Typography>
                      <Typography variant="caption" fontWeight={700} color="primary">
                        {verifiedCount} / 4 steps
                      </Typography>
                    </Box>
                    <div className="premium-progress">
                      <motion.div
                        className="premium-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${verifiedCount * 25}%` }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Dashboard;
