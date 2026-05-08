import React from 'react';
import { Box, Avatar, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../../utils/helpers';
import { ROUTES } from '../../utils/constants';

const ProfileCard = ({ company, user }) => {
  const navigate = useNavigate();
  const name = company?.companyName || company?.name || user?.firstName || 'Company';
  const email = company?.businessEmail || user?.email;
  const status = company?.status || 'Active';

  const isVerified = status === 'verified' || status === 'Verified';

  return (
    <div className="profile-card">
      {/* Banner */}
      <div
        className="profile-banner"
        style={{
          backgroundImage: company?.bannerUrl ? `url(${company.bannerUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="profile-avatar-wrap">
          <Avatar
            src={company?.logoUrl}
            sx={{
              width: 80,
              height: 80,
              border: '4px solid #fff',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              fontSize: '1.5rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {getInitials(name)}
          </Avatar>
        </div>
      </div>

      {/* Info */}
      <div className="profile-info">
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" fontWeight={700}>
                {name}
              </Typography>
              {isVerified && (
                <VerifiedIcon sx={{ color: '#2563eb', fontSize: 20 }} />
              )}
            </Box>
            {email && (
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
            )}
            {company?.industry && (
              <Typography variant="caption" color="text.secondary">
                {company.industry}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                backgroundColor: isVerified ? '#d1fae5' : '#fef3c7',
                color: isVerified ? '#065f46' : '#92400e',
                fontWeight: 600,
                fontSize: '0.72rem',
              }}
            />
            <Tooltip title="Edit Profile">
              <IconButton size="small" onClick={() => navigate(ROUTES.SETTINGS)}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {company?.rcNumber && (
          <Box sx={{ mt: 1.5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">RC Number</Typography>
              <Typography variant="body2" fontWeight={600}>{company.rcNumber}</Typography>
            </Box>
            {company?.country && (
              <Box>
                <Typography variant="caption" color="text.secondary">Country</Typography>
                <Typography variant="body2" fontWeight={600}>{company.country}</Typography>
              </Box>
            )}
            {company?.companyType && (
              <Box>
                <Typography variant="caption" color="text.secondary">Type</Typography>
                <Typography variant="body2" fontWeight={600}>{company.companyType}</Typography>
              </Box>
            )}
          </Box>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
