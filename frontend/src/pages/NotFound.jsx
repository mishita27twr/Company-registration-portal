import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)',
        textAlign: 'center',
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <Box
          sx={{
            width: 100, height: 100, borderRadius: '24px',
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 3, boxShadow: '0 8px 32px rgba(245,158,11,0.2)',
          }}
        >
          <ReportProblemOutlinedIcon sx={{ fontSize: 48, color: '#f59e0b' }} />
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Typography
            variant="h1"
            fontWeight={900}
            sx={{
              fontSize: '5rem',
              background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              mb: 1,
            }}
          >
            404
          </Typography>
          <Typography variant="h5" fontWeight={700} mb={1} color="#0f172a">
            Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4} maxWidth={380} mx="auto" lineHeight={1.7}>
            Sorry, the page you're looking for doesn't exist or has been moved.
          </Typography>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Button
              variant="contained"
              startIcon={<HomeOutlinedIcon />}
              onClick={() => navigate('/')}
              sx={{
                borderRadius: '12px', textTransform: 'none', fontWeight: 700, px: 4, py: 1.4,
                background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
              }}
            >
              Go Back Home
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default NotFound;
