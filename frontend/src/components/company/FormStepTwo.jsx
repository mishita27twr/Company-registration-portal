import React from 'react';
import { TextField, MenuItem, Typography } from '@mui/material';
import { INDUSTRIES } from '../../utils/constants';

const FormStepTwo = ({ register, errors }) => {
  return (
    <div>
      <Typography variant="subtitle1" fontWeight={600} mb={2} color="text.secondary">
        Business Details & Contact
      </Typography>
      <div className="form-grid-2">
        <TextField
          select
          label="Industry"
          fullWidth
          defaultValue=""
          {...register('industry', { required: 'Industry is required' })}
          error={!!errors.industry}
          helperText={errors.industry?.message}
        >
          <MenuItem value="">Select industry</MenuItem>
          {INDUSTRIES.map((ind) => (
            <MenuItem key={ind} value={ind}>{ind}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Business Email"
          type="email"
          fullWidth
          {...register('businessEmail', {
            required: 'Business email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
          })}
          error={!!errors.businessEmail}
          helperText={errors.businessEmail?.message}
        />

        <TextField
          label="Website URL"
          fullWidth
          placeholder="https://example.com"
          {...register('website')}
          error={!!errors.website}
          helperText={errors.website?.message}
        />

        <TextField
          label="Number of Employees"
          type="number"
          fullWidth
          {...register('numEmployees', { min: { value: 1, message: 'Must be at least 1' } })}
          error={!!errors.numEmployees}
          helperText={errors.numEmployees?.message}
        />

        <TextField
          label="Annual Revenue (USD)"
          type="number"
          fullWidth
          {...register('annualRevenue')}
        />

        <TextField
          label="LinkedIn Profile"
          fullWidth
          placeholder="https://linkedin.com/company/..."
          {...register('linkedin')}
        />

        <div style={{ gridColumn: '1 / -1' }}>
          <TextField
            label="Company Description"
            fullWidth
            multiline
            rows={4}
            placeholder="Describe your company's core business activities, mission, and services..."
            {...register('description', { required: 'Description is required', minLength: { value: 20, message: 'Min 20 characters' } })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default FormStepTwo;
