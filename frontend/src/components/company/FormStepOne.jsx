import React from 'react';
import { Grid, TextField, MenuItem, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { COMPANY_TYPES, COUNTRIES } from '../../utils/constants';

const FormStepOne = ({ register, errors, watch, setValue }) => {
  const phone = watch('phone');

  return (
    <div>
      <Typography variant="subtitle1" fontWeight={600} mb={2} color="text.secondary">
        Basic Company Information
      </Typography>
      <div className="form-grid-2">
        <TextField
          label="Company Name"
          fullWidth
          {...register('companyName', { required: 'Company name is required' })}
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
        />

        <TextField
          label="RC Number / Registration No."
          fullWidth
          {...register('rcNumber', { required: 'RC number is required' })}
          error={!!errors.rcNumber}
          helperText={errors.rcNumber?.message}
        />

        <TextField
          select
          label="Company Type"
          fullWidth
          defaultValue=""
          {...register('companyType', { required: 'Company type is required' })}
          error={!!errors.companyType}
          helperText={errors.companyType?.message}
        >
          <MenuItem value="">Select type</MenuItem>
          {COMPANY_TYPES.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Country of Registration"
          fullWidth
          defaultValue=""
          {...register('country', { required: 'Country is required' })}
          error={!!errors.country}
          helperText={errors.country?.message}
        >
          <MenuItem value="">Select country</MenuItem>
          {COUNTRIES.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Date of Incorporation"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register('incorporationDate', { required: 'Date of incorporation is required' })}
          error={!!errors.incorporationDate}
          helperText={errors.incorporationDate?.message}
        />

        <TextField
          label="Tax Identification Number (TIN)"
          fullWidth
          {...register('tin')}
        />

        <div style={{ gridColumn: '1 / -1' }}>
          <PhoneInput
            country="ng"
            value={phone}
            onChange={(val) => setValue('phone', val)}
            inputStyle={{
              width: '100%',
              height: 56,
              fontSize: '1rem',
              borderRadius: '10px',
              fontFamily: 'Inter, Arial, sans-serif',
            }}
            containerStyle={{ width: '100%' }}
            specialLabel="Company Phone Number"
          />
          {errors.phone && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
              {errors.phone.message}
            </Typography>
          )}
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <TextField
            label="Company Address"
            fullWidth
            multiline
            rows={2}
            {...register('address', { required: 'Company address is required' })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default FormStepOne;
