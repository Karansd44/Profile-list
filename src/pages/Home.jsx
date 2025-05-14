"use client";

import { useEffect, useState } from 'react';
import { useProfiles } from '../context/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import MapView from '../components/MapView';
import SearchFilter from '../components/SearchFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Grid, Container, Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
const Home = () => {
  const { filteredProfiles, loading, error, selectedProfile, setSelectedProfile } = useProfiles();
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = (profile) => {
    setSelectedProfile(profile);
    setShowMap(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            mb: 4
          }}
        >
          Profile Explorer
        </Typography>
        
        <SearchFilter />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Grid container spacing={4}>
              {filteredProfiles.map((profile) => (
                <Grid item xs={12} sm={6} md={4} key={profile.id}>
                  <ProfileCard 
                    profile={profile} 
                    onShowMap={handleShowMap} 
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {showMap && selectedProfile && (
            <Box sx={{ 
              width: { xs: '100%', lg: '40%' },
              height: { xs: '400px', lg: '600px' },
              position: { xs: 'relative', lg: 'sticky' },
              top: { lg: '20px' }
            }}>
              <MapView 
                location={[
                  selectedProfile.address.lat,
                  selectedProfile.address.lng
                ]}
                address={{
                  name: selectedProfile.name,
                  street: selectedProfile.address.street,
                  city: selectedProfile.address.city,
                  country: selectedProfile.address.country
                }}
              />
            </Box>
          )}
        </Box>
      </motion.div>
    </Container>
  );
};

export default Home;