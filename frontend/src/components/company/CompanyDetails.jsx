import React from 'react';
import { Box, Typography, Chip, Grid, Divider } from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Loader from '../common/Loader';
import { formatDate } from '../../utils/helpers';

const DetailRow = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1 }}>
      <Box sx={{ color: '#6b7280', mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const CompanyDetails = ({ company, loading }) => {
  if (loading) return <Loader />;

  if (!company) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <BusinessOutlinedIcon sx={{ fontSize: 48, color: '#d1d5db', mb: 1 }} />
        <Typography variant="body1" color="text.secondary">
          No company profile found
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Register your company to see details here
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          {company.companyName || company.name}
        </Typography>
        <Chip
          label={company.status || 'Active'}
          size="small"
          sx={{
            backgroundColor: '#d1fae5',
            color: '#065f46',
            fontWeight: 600,
            fontSize: '0.72rem',
          }}
        />
      </Box>

      {company.description && (
        <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 1.7 }}>
          {company.description}
        </Typography>
      )}

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <DetailRow
            icon={<BusinessOutlinedIcon fontSize="small" />}
            label="Company Type"
            value={company.companyType}
          />
          <DetailRow
            icon={<LocationOnOutlinedIcon fontSize="small" />}
            label="Address"
            value={company.address}
          />
          <DetailRow
            icon={<PhoneOutlinedIcon fontSize="small" />}
            label="Phone"
            value={company.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DetailRow
            icon={<EmailOutlinedIcon fontSize="small" />}
            label="Business Email"
            value={company.businessEmail}
          />
          <DetailRow
            icon={<LanguageOutlinedIcon fontSize="small" />}
            label="Website"
            value={company.website}
          />
          <DetailRow
            icon={<CalendarTodayOutlinedIcon fontSize="small" />}
            label="Incorporated"
            value={formatDate(company.incorporationDate)}
          />
          <DetailRow
            icon={<GroupsOutlinedIcon fontSize="small" />}
            label="Employees"
            value={company.numEmployees ? `${company.numEmployees}+` : undefined}
          />
        </Grid>
      </Grid>

      {company.industry && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
            Industry
          </Typography>
          <Chip
            label={company.industry}
            size="small"
            sx={{ backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 500 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CompanyDetails;
