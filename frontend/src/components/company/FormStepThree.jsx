import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import ImageUploader from './ImageUploader';

const FormStepThree = ({ watch, setValue }) => {
  const allValues = watch();

  const summaryFields = [
    { label: 'Company Name', value: allValues.companyName },
    { label: 'RC Number', value: allValues.rcNumber },
    { label: 'Company Type', value: allValues.companyType },
    { label: 'Country', value: allValues.country },
    { label: 'Industry', value: allValues.industry },
    { label: 'Business Email', value: allValues.businessEmail },
    { label: 'Website', value: allValues.website },
  ];

  return (
    <div>
      <Typography variant="subtitle1" fontWeight={600} mb={2} color="text.secondary">
        Upload Assets & Review
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <ImageUploader
            type="logo"
            label="Company Logo"
            onUploadSuccess={(data) => setValue('logoUrl', data?.url)}
          />
        </Box>

        <Box>
          <ImageUploader
            type="banner"
            label="Company Banner"
            onUploadSuccess={(data) => setValue('bannerUrl', data?.url)}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={2} color="text.primary">
            Review Your Information
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 1.5,
            }}
          >
            {summaryFields.map(({ label, value }) =>
              value ? (
                <Box
                  key={label}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    p: 1.5,
                    borderRadius: '8px',
                    backgroundColor: '#f8faff',
                    border: '1px solid #e0e7ff',
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ color: '#10b981', fontSize: 18, mt: 0.2, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {label}
                    </Typography>
                    <Typography variant="body2" fontWeight={500} noWrap>
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ) : null
            )}
          </Box>
        </Box>

        <Alert severity="info" sx={{ borderRadius: '10px' }}>
          Please review all information before submitting. Your company registration will be reviewed by our team.
        </Alert>
      </Box>
    </div>
  );
};

export default FormStepThree;
