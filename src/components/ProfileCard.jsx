import { motion, AnimatePresence } from "framer-motion";import { useState } from 'react';
import { Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ProfileCard = ({ profile, onShowMap }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="profile-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image">
        <img 
          src={profile.image} 
          alt={profile.name} 
          style={{ 
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        />
      </div>
      <div className="card-content">
        <h3>{profile.name}</h3>
        <p>{profile.description}</p>
        <Button
          variant="contained"
          startIcon={<LocationOnIcon />}
          onClick={() => onShowMap(profile)}
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 8px 2px rgba(255, 105, 135, .4)'
            }
          }}
        >
          View Location
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;