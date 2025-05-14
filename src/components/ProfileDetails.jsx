"use client";

import { useParams, useRouter } from 'next/navigation';
import { useProfiles } from '@/context/ProfileContext';
import { Box, Typography, Button, Grid, Paper, Avatar, Chip, Divider } from '@mui/material';
import MapView from '@/components/MapView';
import LoadingSpinner from '@/components/LoadingSpinner';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import PublicIcon from '@mui/icons-material/Public';

const ProfileDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { profiles, loading } = useProfiles();
  
  const profile = profiles.find(p => p.id === id);

  if (loading) return <LoadingSpinner />;
  if (!profile) return <Typography variant="h4">Profile not found</Typography>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.back()}
          sx={{ mb: 3 }}
          variant="outlined"
        >
          Back to Profiles
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                height: '100%'
              }}
              component={motion.div}
              whileHover={{ y: -5 }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center', 
                mb: 3,
                gap: 3
              }}>
                <Avatar 
                  src={profile.image} 
                  alt={profile.name}
                  sx={{ 
                    width: 150, 
                    height: 150,
                    border: '3px solid',
                    borderColor: 'primary.main'
                  }}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                />
                <Box>
                  <Typography variant="h3" component="h1">
                    {profile.name}
                  </Typography>
                  {profile.title && (
                    <Typography variant="h6" color="text.secondary">
                      {profile.title}
                    </Typography>
                  )}
                  {profile.tags && (
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {profile.tags.map((tag, index) => (
                        <Chip 
                          key={index} 
                          label={tag} 
                          size="small"
                          component={motion.div}
                          whileHover={{ scale: 1.05 }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                About
              </Typography>
              <Typography paragraph>
                {profile.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" gutterBottom>
                    Contact Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <EmailIcon color="primary" />
                    <Typography>
                      {profile.email || 'Not provided'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PhoneIcon color="primary" />
                    <Typography>
                      {profile.phone || 'Not provided'}
                    </Typography>
                  </Box>
                  {profile.website && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <PublicIcon color="primary" />
                      <Typography component="a" href={profile.website} target="_blank" rel="noopener">
                        {profile.website}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" gutterBottom>
                    Address
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <LocationOnIcon color="primary" />
                    <Box>
                      <Typography>{profile.address.street}</Typography>
                      <Typography>
                        {profile.address.city}, {profile.address.country}
                      </Typography>
                      {profile.address.postalCode && (
                        <Typography>Postal Code: {profile.address.postalCode}</Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {profile.skills && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h5" gutterBottom>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {profile.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill.name}
                        icon={<WorkIcon />}
                        color={skill.level === 'expert' ? 'primary' : 'default'}
                        variant={skill.level === 'beginner' ? 'outlined' : 'filled'}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                height: { xs: '400px', md: '600px' },
                position: 'sticky',
                top: '20px',
                borderRadius: 3,
                overflow: 'hidden'
              }}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
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

export default ProfileDetails;