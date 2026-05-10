export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";export const TOKEN_KEY = 'crm_token';
export const USER_KEY = 'crm_user';

export const COMPANY_TYPES = [
  'Sole Proprietorship',
  'Partnership',
  'Limited Liability Company (LLC)',
  'Corporation',
  'Non-Profit Organization',
  'Cooperative',
  'Other',
];

export const INDUSTRIES = [
  'Technology',
  'Finance & Banking',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail & E-commerce',
  'Real Estate',
  'Transportation & Logistics',
  'Media & Entertainment',
  'Agriculture',
  'Construction',
  'Energy & Utilities',
  'Consulting & Professional Services',
  'Food & Beverage',
  'Other',
];

export const COUNTRIES = [
  'Nigeria', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'South Africa', 'Kenya', 'Ghana',
  'India', 'Brazil', 'UAE', 'Singapore', 'Other',
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COMPANY_REGISTRATION: '/company/register',
  SETTINGS: '/settings',
};
