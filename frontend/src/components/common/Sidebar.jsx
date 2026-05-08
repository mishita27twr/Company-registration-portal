import React from 'react';
import { Box, Drawer, Typography, Avatar, Divider, Tooltip } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';

export const SIDEBAR_WIDTH = 260;

const navItems = [
  { label: 'Home', icon: <HomeOutlinedIcon fontSize="small" />, path: ROUTES.HOME },
  { label: 'Dashboard', icon: <DashboardOutlinedIcon fontSize="small" />, path: ROUTES.DASHBOARD },
  { label: 'Company Profile', icon: <BusinessOutlinedIcon fontSize="small" />, path: ROUTES.DASHBOARD },
  { label: 'Register Company', icon: <AddBusinessOutlinedIcon fontSize="small" />, path: ROUTES.COMPANY_REGISTRATION },
  { label: 'Settings', icon: <SettingsOutlinedIcon fontSize="small" />, path: ROUTES.SETTINGS },
];

const NavItem = ({ item, isActive, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.05 + index * 0.06, duration: 0.3 }}
  >
    <motion.button
      onClick={() => onClick(item.path)}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.97 }}
      style={{
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '10px 14px',
        borderRadius: 12,
        cursor: 'pointer',
        position: 'relative',
        marginBottom: 2,
        color: isActive ? '#2563eb' : '#64748b',
        fontWeight: isActive ? 600 : 500,
        fontSize: '0.875rem',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
        transition: 'color 0.15s',
      }}
    >
      {/* Active background */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="sidebar-active-bg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 12,
              background: 'linear-gradient(90deg, rgba(37,99,235,0.09), rgba(124,58,237,0.05))',
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          color: isActive ? '#2563eb' : '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.15s',
        }}
      >
        {item.icon}
      </Box>

      {/* Label */}
      <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>

      {/* Active pip */}
      {isActive && (
        <motion.div
          layoutId="sidebar-active-pip"
          style={{
            position: 'absolute',
            right: 10,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#2563eb',
            zIndex: 1,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      )}
    </motion.button>
  </motion.div>
);

const SidebarContent = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const displayName = user
    ? `${user.firstName || user.name || ''} ${user.lastName || ''}`.trim() || user.email || 'User'
    : 'User';

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid #f1f5f9' }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1rem',
              flexShrink: 0,
            }}
          >
            C
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={800}
              sx={{
                background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
                fontFamily: 'Poppins, Inter, sans-serif',
              }}
            >
              CompanyHub
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ lineHeight: 1 }}>
              Business Platform
            </Typography>
          </Box>
        </Box>
      </motion.div>

      {/* Nav */}
      <Box sx={{ flex: 1, px: 1.5, py: 2, overflowY: 'auto' }}>
        <Typography variant="overline" color="text.disabled" sx={{ px: 1.5, mb: 1, display: 'block', fontSize: '0.68rem', letterSpacing: '0.1em' }}>
          Main Menu
        </Typography>
        {navItems.slice(0, 3).map((item, i) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={location.pathname === item.path}
            onClick={handleNav}
            index={i}
          />
        ))}

        <Divider sx={{ my: 1.5, borderColor: '#f1f5f9' }} />
        <Typography variant="overline" color="text.disabled" sx={{ px: 1.5, mb: 1, display: 'block', fontSize: '0.68rem', letterSpacing: '0.1em' }}>
          Account
        </Typography>
        {navItems.slice(3).map((item, i) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={location.pathname === item.path}
            onClick={handleNav}
            index={3 + i}
          />
        ))}
      </Box>

      {/* User footer */}
      <Divider sx={{ borderColor: '#f1f5f9' }} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              fontSize: '0.85rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {getInitials(displayName)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email || 'Account'}
            </Typography>
          </Box>
          <Tooltip title="Sign out">
            <motion.button
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              style={{
                all: 'unset',
                cursor: 'pointer',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                padding: 4,
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              <LogoutIcon sx={{ fontSize: 18 }} />
            </motion.button>
          </Tooltip>
        </Box>
      </motion.div>
    </Box>
  );
};

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Desktop permanent */}
      <Box
        className="dashboard-sidebar"
        sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column' }}
      >
        <SidebarContent />
      </Box>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            border: 'none',
            boxShadow: '8px 0 32px rgba(15,23,42,0.12)',
          },
        }}
      >
        <SidebarContent onClose={onClose} />
      </Drawer>
    </>
  );
};

export default Sidebar;
