import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Grid, Divider, Alert, Card, CardContent,
  Avatar, Tabs, Tab, Switch, MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import CustomButton from '../components/ui/CustomButton';
import ImageUploader from '../components/company/ImageUploader';
import { useCompany } from '../hooks/useCompany';
import { getInitials } from '../utils/helpers';
import { COUNTRIES, INDUSTRIES } from '../utils/constants';
import AnimatedPage, { slideUpItem } from '../components/common/AnimatedPage';

const TabPanel = ({ children, value, index }) =>
  value === index ? (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ py: 3 }}>{children}</Box>
    </motion.div>
  ) : null;

const Settings = () => {
  const [tab, setTab] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { profile, updating, updateProfile, loading } = useCompany();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm();

  useEffect(() => {
    if (profile) {
      reset({
        companyName: profile.companyName || profile.name || '',
        businessEmail: profile.businessEmail || '',
        website: profile.website || '',
        address: profile.address || '',
        description: profile.description || '',
        industry: profile.industry || '',
        country: profile.country || '',
        linkedin: profile.linkedin || '',
        numEmployees: profile.numEmployees || '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    const result = await updateProfile(data);
    if (result.success) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update profile');
    }
  };

  const displayName = user
    ? `${user.firstName || user.name || ''} ${user.lastName || ''}`.trim() || 'User'
    : 'User';

  return (
    <DashboardLayout>
      <AnimatedPage>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={800} color="#0f172a">Settings</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your company profile, branding, and preferences
          </Typography>
        </Box>

        <Card sx={{ boxShadow: '0 2px 20px rgba(15,23,42,0.07)' }}>
          <Box sx={{ borderBottom: '1px solid #f1f5f9', px: 3 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{
                '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem', minHeight: 52 },
                '& .Mui-selected': { color: '#2563eb' },
                '& .MuiTabs-indicator': { background: 'linear-gradient(90deg, #2563eb, #7c3aed)', height: 3, borderRadius: 2 },
              }}
            >
              <Tab label="Company Profile" />
              <Tab label="Branding" />
              <Tab label="Preferences" />
            </Tabs>
          </Box>

          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            {/* Company Profile */}
            <TabPanel value={tab} index={0}>
              {!profile && !loading && (
                <Alert severity="warning" sx={{ mb: 3, borderRadius: '12px' }}>
                  You haven't registered a company yet. Please register your company first.
                </Alert>
              )}

              {/* Profile preview header */}
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2.5,
                  borderRadius: '14px', background: 'linear-gradient(135deg, #f8fafc, #f0f4ff)',
                  border: '1px solid #e8ecf0',
                }}
              >
                <Avatar
                  src={profile?.logoUrl}
                  sx={{
                    width: 56, height: 56,
                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                    fontSize: '1.1rem', fontWeight: 700, flexShrink: 0,
                  }}
                >
                  {getInitials(profile?.companyName || profile?.name || displayName)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {profile?.companyName || profile?.name || 'Your Company'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile?.industry || 'No industry set'} · {profile?.country || 'No country set'}
                  </Typography>
                </Box>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Company Name" fullWidth
                      {...register('companyName', { required: 'Required' })}
                      error={!!errors.companyName} helperText={errors.companyName?.message} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Business Email" type="email" fullWidth {...register('businessEmail')} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField select label="Industry" fullWidth defaultValue={profile?.industry || ''} {...register('industry')}>
                      <MenuItem value="">Select industry</MenuItem>
                      {INDUSTRIES.map((ind) => <MenuItem key={ind} value={ind}>{ind}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField select label="Country" fullWidth defaultValue={profile?.country || ''} {...register('country')}>
                      <MenuItem value="">Select country</MenuItem>
                      {COUNTRIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Website" fullWidth placeholder="https://example.com" {...register('website')} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="LinkedIn" fullWidth placeholder="https://linkedin.com/company/..." {...register('linkedin')} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Number of Employees" type="number" fullWidth {...register('numEmployees')} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Company Address" fullWidth {...register('address')} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Company Description" fullWidth multiline rows={3} {...register('description')} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                      <CustomButton variant="outlined" type="button" onClick={() => reset()} sx={{ borderColor: '#e2e8f0' }}>
                        Reset
                      </CustomButton>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <CustomButton
                          variant="contained"
                          type="submit"
                          loading={updating}
                          disabled={!profile}
                          sx={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed)', px: 4 }}
                        >
                          Save Changes
                        </CustomButton>
                      </motion.div>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>

            {/* Branding */}
            <TabPanel value={tab} index={1}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <motion.div variants={slideUpItem} initial="hidden" animate="show">
                  <Typography variant="subtitle1" fontWeight={700} mb={0.5}>Company Logo</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Upload a square image. Recommended size: 400×400px.
                  </Typography>
                  <ImageUploader type="logo" currentImage={profile?.logoUrl} onUploadSuccess={() => toast.success('Logo updated!')} />
                </motion.div>
                <Divider />
                <motion.div variants={slideUpItem} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
                  <Typography variant="subtitle1" fontWeight={700} mb={0.5}>Company Banner</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Recommended: 1200×300px. Appears on your company profile.
                  </Typography>
                  <ImageUploader type="banner" currentImage={profile?.bannerUrl} onUploadSuccess={() => toast.success('Banner updated!')} />
                </motion.div>
              </Box>
            </TabPanel>

            {/* Preferences */}
            <TabPanel value={tab} index={2}>
              <Typography variant="subtitle1" fontWeight={700} mb={2}>Notifications</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { label: 'Email notifications', sublabel: 'Receive alerts and updates via email', def: true },
                  { label: 'Verification updates', sublabel: 'Get notified when your verification status changes', def: true },
                  { label: 'Document reminders', sublabel: 'Receive reminders for pending documents', def: true },
                  { label: 'Marketing emails', sublabel: 'News, tips, and product updates from CompanyHub', def: false },
                ].map((pref, i) => (
                  <motion.div
                    key={pref.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Box
                      sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        p: 2, borderRadius: '12px', border: '1px solid #f1f5f9', backgroundColor: '#fafbfc',
                        transition: 'all 0.2s',
                        '&:hover': { backgroundColor: '#f8faff', borderColor: '#e0e7ff' },
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{pref.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{pref.sublabel}</Typography>
                      </Box>
                      <Switch defaultChecked={pref.def} color="primary" />
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </TabPanel>
          </CardContent>
        </Card>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Settings;
