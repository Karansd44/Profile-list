
"use client";
import { useParams } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';
import { Box, Typography, Button, Grid, Paper, Avatar } from '@mui/material';
import MapView from '../components/MapView';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion, AnimatePresence } from "framer-motion";import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();
  const { profiles, loading } = useProfiles();
  const navigate = useNavigate();
  
  const profile = profiles.find(p => p.id === id);

  if (loading) return <LoadingSpinner />;
  if (!profile) return <div>Profile not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back to Profiles
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={profile.image} 
                  alt={profile.name}
                  sx={{ 
                    width: 120, 
                    height: 120,
                    mr: 3,
                    border: '3px solid',
                    borderColor: 'primary.main'
                  }}
                />
                <Typography variant="h3" component="h1">
                  {profile.name}
                </Typography>
              </Box>

              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                About
              </Typography>
              <Typography paragraph>
                {profile.description}
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Contact Information
              </Typography>
              <Typography paragraph>
                <strong>Email:</strong> {profile.email || 'Not provided'}
              </Typography>
              <Typography paragraph>
                <strong>Phone:</strong> {profile.phone || 'Not provided'}
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Address
              </Typography>
              <Typography paragraph>
                {profile.address.street}<br />
                {profile.address.city}, {profile.address.country}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ height: '500px', position: 'sticky', top: '20px' }}>
              <MapView 
                location={[profile.address.lat, profile.address.lng]}
                address={{
                  name: profile.name,
                  street: profile.address.street,
                  city: profile.address.city,
                  country: profile.address.country
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default ProfilePage;