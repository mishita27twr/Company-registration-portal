import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed',
      light: '#a78bfa',
      dark: '#5b21b6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
    error: { main: '#ef4444' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    info: { main: '#06b6d4' },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "'Inter', 'Poppins', Arial, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shadows: [
    'none',
    '0 1px 4px rgba(15,23,42,0.07)',
    '0 2px 8px rgba(15,23,42,0.08)',
    '0 4px 16px rgba(15,23,42,0.09)',
    '0 8px 24px rgba(15,23,42,0.10)',
    '0 12px 32px rgba(15,23,42,0.11)',
    ...Array(19).fill('0 16px 48px rgba(15,23,42,0.13)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          padding: '10px 22px',
          fontSize: '0.9rem',
          transition: 'all 0.2s ease',
          '&.MuiButton-contained': {
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)',
              transform: 'translateY(-1px)',
            },
            '&:active': { transform: 'translateY(0)' },
          },
          '&.MuiButton-containedSecondary': {
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(124, 58, 237, 0.35)',
            },
          },
          '&.MuiButton-outlined': {
            borderWidth: '1.5px',
            '&:hover': { borderWidth: '1.5px', transform: 'translateY(-1px)' },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#fafafa',
            transition: 'all 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
            '&.Mui-focused': {
              backgroundColor: '#fff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2563eb',
                borderWidth: '2px',
              },
            },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#2563eb' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '18px',
          boxShadow: '0 1px 8px rgba(15,23,42,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
          transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: '18px' },
        elevation1: { boxShadow: '0 1px 8px rgba(15,23,42,0.06)' },
        elevation2: { boxShadow: '0 2px 16px rgba(15,23,42,0.08)' },
        elevation3: { boxShadow: '0 4px 24px rgba(15,23,42,0.10)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: '8px', fontWeight: 500 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRadius: 0 },
      },
    },
  },
});

export default theme;
