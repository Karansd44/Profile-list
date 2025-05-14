"use client"

import AdminPanel from '../components/AdminPanel';
import { useProfiles } from '../context/ProfileContext';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Admin = () => {
  const { isAdmin } = useProfiles();

  if (!isAdmin) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4">
          Please login as admin to access this page
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h2" gutterBottom>
          Admin Dashboard
        </Typography>
        <AdminPanel />
      </Box>
    </motion.div>
  );
};

export default Admin;