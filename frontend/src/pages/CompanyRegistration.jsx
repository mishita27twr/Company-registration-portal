import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import CompanyForm from '../components/company/CompanyForm';
import { ROUTES } from '../utils/constants';

const CompanyRegistration = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          sx={{ textTransform: 'none', color: '#6b7280', mb: 1 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h5" fontWeight={700}>
          Register Your Company
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill in the details below to register and verify your company
        </Typography>
      </Box>
      <CompanyForm />
    </DashboardLayout>
  );
};

export default CompanyRegistration;
