import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import FormStepThree from './FormStepThree';
import CustomButton from '../ui/CustomButton';
import { useCompany } from '../../hooks/useCompany';
import { ROUTES } from '../../utils/constants';

const STEPS = [
  { label: 'Company Info', sublabel: 'Basic details' },
  { label: 'Business Details', sublabel: 'Industry & contact' },
  { label: 'Assets & Review', sublabel: 'Upload & confirm' },
];

const stepVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.25 } }),
};

const StepIndicator = ({ step, index, activeStep }) => {
  const isDone = index < activeStep;
  const isActive = index === activeStep;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
        {index > 0 && (
          <Box
            sx={{
              flex: 1,
              height: 2,
              background: isDone || isActive ? 'linear-gradient(90deg, #2563eb, #7c3aed)' : '#e2e8f0',
              transition: 'background 0.4s ease',
            }}
          />
        )}
        <motion.div
          animate={{
            scale: isActive ? 1.15 : 1,
            boxShadow: isActive ? '0 0 0 4px rgba(37,99,235,0.15)' : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.25 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: isDone
              ? 'linear-gradient(135deg, #10b981, #059669)'
              : isActive
              ? 'linear-gradient(135deg, #2563eb, #7c3aed)'
              : '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: isDone || isActive ? '#fff' : '#94a3b8',
            fontWeight: 700,
            fontSize: '0.85rem',
            transition: 'background 0.3s ease',
            zIndex: 1,
          }}
        >
          {isDone ? <CheckIcon sx={{ fontSize: 16 }} /> : index + 1}
        </motion.div>
        {index < STEPS.length - 1 && (
          <Box
            sx={{
              flex: 1,
              height: 2,
              background: isDone ? 'linear-gradient(90deg, #2563eb, #7c3aed)' : '#e2e8f0',
              transition: 'background 0.4s ease',
            }}
          />
        )}
      </Box>
      <Box sx={{ mt: 0.75, textAlign: 'center' }}>
        <Typography
          variant="caption"
          fontWeight={isActive ? 700 : 500}
          color={isActive ? 'primary' : isDone ? 'text.secondary' : 'text.disabled'}
          sx={{ display: 'block', lineHeight: 1.3 }}
        >
          {step.label}
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.68rem' }}>
          {step.sublabel}
        </Typography>
      </Box>
    </Box>
  );
};

const CompanyForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();
  const { register: registerCompany } = useCompany();

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({ mode: 'onChange' });

  const stepFields = [
    ['companyName', 'rcNumber', 'companyType', 'country', 'address'],
    ['industry', 'businessEmail', 'description'],
    [],
  ];

  const handleNext = async () => {
    const valid = await trigger(stepFields[activeStep]);
    if (valid) {
      setDirection(1);
      setActiveStep((p) => p + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setActiveStep((p) => p - 1);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const result = await registerCompany(data);
      if (result.success) {
        setSubmitSuccess(true);
        toast.success('🎉 Company registered successfully!');
        setTimeout(() => navigate(ROUTES.DASHBOARD), 1800);
      } else {
        toast.error(result.error || 'Registration failed. Please try again.');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="step-form-card">
          <Box sx={{ p: 8, textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <Box
                sx={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mx: 'auto', mb: 3, boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
                }}
              >
                <CheckIcon sx={{ color: '#fff', fontSize: 36 }} />
              </Box>
            </motion.div>
            <Typography variant="h5" fontWeight={800} mb={1}>Registration Submitted!</Typography>
            <Typography variant="body2" color="text.secondary">
              Your company has been registered. Redirecting to dashboard...
            </Typography>
          </Box>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="step-form-card">
      <div className="step-form-header">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h5" fontWeight={800} color="#0f172a">
              Register Company
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Step {activeStep + 1} of {STEPS.length} — {STEPS[activeStep].label}
            </Typography>
          </Box>
          <Chip
            label={`${activeStep + 1}/${STEPS.length}`}
            size="small"
            sx={{
              background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
              color: '#fff', fontWeight: 700, fontSize: '0.8rem',
            }}
          />
        </Box>

        {/* Step indicators */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {STEPS.map((step, i) => (
            <StepIndicator key={step.label} step={step} index={i} activeStep={activeStep} />
          ))}
        </Box>

        {/* Progress bar */}
        <Box sx={{ mt: 2 }}>
          <div className="premium-progress">
            <motion.div
              className="premium-progress-fill"
              initial={false}
              animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </Box>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="step-form-body" style={{ overflow: 'hidden' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {activeStep === 0 && <FormStepOne register={register} errors={errors} watch={watch} setValue={setValue} />}
              {activeStep === 1 && <FormStepTwo register={register} errors={errors} />}
              {activeStep === 2 && <FormStepThree watch={watch} setValue={setValue} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="step-form-footer">
          {activeStep > 0 && (
            <CustomButton variant="outlined" onClick={handleBack} type="button" sx={{ borderColor: '#e2e8f0' }}>
              Back
            </CustomButton>
          )}
          {activeStep < STEPS.length - 1 ? (
            <CustomButton
              variant="contained"
              onClick={handleNext}
              type="button"
              sx={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed)', px: 4 }}
            >
              Continue
            </CustomButton>
          ) : (
            <CustomButton
              variant="contained"
              type="submit"
              loading={submitting}
              sx={{ background: 'linear-gradient(90deg, #10b981, #059669)', px: 4, minWidth: 180 }}
            >
              Submit Registration
            </CustomButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
