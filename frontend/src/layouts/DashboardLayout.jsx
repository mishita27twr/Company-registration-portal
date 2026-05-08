import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="dashboard-main">
        <Navbar onMenuToggle={() => setMobileOpen((p) => !p)} />
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
