import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import EastIcon from '@mui/icons-material/East';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ROUTES } from '../utils/constants';

const features = [
  { icon: <VerifiedOutlinedIcon />, title: 'Fast Verification', desc: 'Get your company verified in as little as 24 hours with our streamlined process.', color: '#2563eb', bg: '#eff6ff' },
  { icon: <SecurityOutlinedIcon />, title: 'Secure & Compliant', desc: 'Bank-level encryption protects your business data at every step.', color: '#7c3aed', bg: '#f5f3ff' },
  { icon: <BusinessCenterOutlinedIcon />, title: 'Complete Profile', desc: 'Build a rich, verified company profile that clients and partners trust.', color: '#10b981', bg: '#d1fae5' },
  { icon: <SpeedOutlinedIcon />, title: 'Easy Registration', desc: 'Our 3-step wizard makes company registration simple and straightforward.', color: '#f59e0b', bg: '#fef3c7' },
];

const stats = [
  { label: 'Companies Registered', value: '12,400+' },
  { label: 'Verified Businesses', value: '9,800+' },
  { label: 'Countries Supported', value: '48+' },
];

const FloatShape = ({ size, top, left, right, bottom, color, delay = 0 }) => (
  <motion.div
    style={{
      position: 'absolute', width: size, height: size,
      top, left, right, bottom,
      borderRadius: '50%', background: color, opacity: 0.13, pointerEvents: 'none',
    }}
    animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
    transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      {/* Navbar */}
      <Box
        component="header"
        sx={{
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e8ecf0',
          py: 1.5,
          px: { xs: 2, md: 6 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Box
            sx={{
              width: 36, height: 36, borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: '1rem',
            }}
          >
            C
          </Box>
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Poppins, Inter, sans-serif',
            }}
          >
            CompanyHub
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', gap: 8, alignItems: 'center' }}
        >
          {isAuthenticated ? (
            <Button
              variant="contained"
              onClick={() => navigate(ROUTES.DASHBOARD)}
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '10px', background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                variant="text"
                onClick={() => navigate(ROUTES.LOGIN)}
                sx={{ textTransform: 'none', fontWeight: 600, color: '#64748b' }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(ROUTES.REGISTER)}
                sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '10px', background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }}
              >
                Get Started Free
              </Button>
            </>
          )}
        </motion.div>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0c1a3d 100%)',
          py: { xs: 10, md: 16 },
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <FloatShape size={400} top="-120px" left="-100px" color="radial-gradient(circle, #2563eb, transparent)" delay={0} />
        <FloatShape size={300} bottom="-80px" right="-60px" color="radial-gradient(circle, #7c3aed, transparent)" delay={2} />
        <FloatShape size={200} top="30%" left="10%" color="radial-gradient(circle, #06b6d4, transparent)" delay={1} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <Chip
              label="✦ Trusted by 12,000+ businesses"
              sx={{
                mb: 3,
                background: 'rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.18)',
                fontWeight: 500,
                fontSize: '0.82rem',
                backdropFilter: 'blur(8px)',
              }}
            />
            <Typography
              variant="h1"
              fontWeight={900}
              sx={{
                color: '#fff',
                fontSize: { xs: '2.4rem', md: '3.8rem' },
                lineHeight: 1.1,
                mb: 3,
                fontFamily: 'Poppins, Inter, sans-serif',
              }}
            >
              Register & Verify Your
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #34d399)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Business with Confidence
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'rgba(255,255,255,0.60)', mb: 5, fontWeight: 400, lineHeight: 1.7, maxWidth: 540, mx: 'auto' }}
            >
              CompanyHub streamlines company registration and verification — helping businesses establish credibility fast.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<EastIcon />}
                  onClick={() => navigate(isAuthenticated ? ROUTES.COMPANY_REGISTRATION : ROUTES.REGISTER)}
                  sx={{
                    borderRadius: '14px', px: 4, py: 1.8, fontSize: '1rem', fontWeight: 700, textTransform: 'none',
                    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                    boxShadow: '0 8px 32px rgba(37,99,235,0.4)',
                  }}
                >
                  {isAuthenticated ? 'Register Company' : 'Start for Free'}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  sx={{
                    borderRadius: '14px', px: 4, py: 1.8, fontSize: '1rem', fontWeight: 700, textTransform: 'none',
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: '#fff',
                    backdropFilter: 'blur(8px)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.07)' },
                  }}
                >
                  Sign In
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Stats strip */}
      <Box sx={{ background: '#fff', borderBottom: '1px solid #f1f5f9', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {stats.map((s, i) => (
              <Grid item xs={12} sm={4} key={s.label}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <Typography variant="h4" fontWeight={900} sx={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {s.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" fontWeight={800} textAlign="center" mb={1.5} sx={{ color: '#0f172a' }}>
            Why Choose CompanyHub?
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={6} maxWidth={480} mx="auto">
            Everything you need to register and verify your business — in one place.
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <Card sx={{ height: '100%', p: 0, boxShadow: '0 2px 16px rgba(15,23,42,0.07)', '&:hover': { boxShadow: '0 12px 40px rgba(37,99,235,0.13)' } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{ backgroundColor: f.bg, color: f.color, mb: 2, width: 50, height: 50, borderRadius: '14px', '& svg': { fontSize: 24 } }}
                    >
                      {f.icon}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={700} mb={0.8}>{f.title}</Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA banner */}
      <Box sx={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', py: { xs: 8, md: 10 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <FloatShape size={300} top="-80px" right="10%" color="radial-gradient(circle, #7c3aed, transparent)" />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" fontWeight={800} sx={{ color: '#fff', mb: 2, fontFamily: 'Poppins, Inter, sans-serif' }}>
              Ready to verify your business?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
              Join thousands of verified businesses on CompanyHub. It's free to start.
            </Typography>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<EastIcon />}
                onClick={() => navigate(isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER)}
                sx={{
                  borderRadius: '14px', px: 5, py: 1.8, fontSize: '1rem', fontWeight: 700, textTransform: 'none',
                  background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                  boxShadow: '0 8px 32px rgba(37,99,235,0.45)',
                }}
              >
                Get Started Free
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid #f1f5f9', py: 3, textAlign: 'center', backgroundColor: '#fff' }}>
        <Typography variant="caption" color="text.disabled">
          © {new Date().getFullYear()} CompanyHub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
