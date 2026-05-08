import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem,
  Box, Tooltip, Divider, Badge, InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';
import { ROUTES } from '../../utils/constants';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => { handleMenuClose(); logout(); };
  const handleSettings = () => { handleMenuClose(); navigate(ROUTES.SETTINGS); };

  const displayName = user
    ? `${user.firstName || user.name || ''} ${user.lastName || ''}`.trim() || user.email || 'User'
    : 'User';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(248,250,252,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e8ecf0',
        color: '#0f172a',
        zIndex: 40,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 }, minHeight: 60 }}>
        {/* Left */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={onMenuToggle}
            sx={{ color: '#64748b', display: { lg: 'none' } }}
            size="small"
          >
            <MenuIcon />
          </IconButton>

          {/* Search bar */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.8,
              borderRadius: '10px',
              backgroundColor: '#f1f5f9',
              border: '1px solid transparent',
              transition: 'all 0.2s',
              '&:focus-within': {
                backgroundColor: '#fff',
                border: '1px solid #c7d2fe',
                boxShadow: '0 0 0 3px rgba(37,99,235,0.08)',
              },
            }}
          >
            <SearchIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
            <InputBase
              placeholder="Search..."
              sx={{ fontSize: '0.875rem', color: '#64748b', minWidth: 180 }}
            />
          </Box>
        </Box>

        {/* Right */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Notifications">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <IconButton size="small" sx={{ color: '#64748b' }}>
                <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', minWidth: 16, height: 16 } }}>
                  <NotificationsOutlinedIcon sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>
            </motion.div>
          </Tooltip>

          <Tooltip title="Settings">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <IconButton size="small" sx={{ color: '#64748b' }} onClick={handleSettings}>
                <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </motion.div>
          </Tooltip>

          <Box sx={{ width: 1, height: 28, bgcolor: '#e2e8f0', mx: 0.5 }} />

          <Tooltip title={displayName}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.30)',
                  }}
                >
                  {getInitials(displayName)}
                </Avatar>
              </IconButton>
            </motion.div>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1, minWidth: 220, borderRadius: '14px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 8px 32px rgba(15,23,42,0.12)',
                overflow: 'visible',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={700}>{displayName}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email || ''}</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleSettings} sx={{ gap: 1.5, py: 1.2, mx: 0.5, borderRadius: '8px', my: 0.5 }}>
              <PersonOutlinedIcon fontSize="small" sx={{ color: '#64748b' }} />
              <Typography variant="body2">Profile & Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, color: '#ef4444', mx: 0.5, borderRadius: '8px', mb: 0.5 }}>
              <LogoutIcon fontSize="small" />
              <Typography variant="body2">Sign Out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
