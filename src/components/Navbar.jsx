"use client"; 

import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useProfiles } from '../context/ProfileContext';
import { motion } from "framer-motion";

const Navbar = () => {
  const { isAdmin, setIsAdmin } = useProfiles();
  
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component={motion.div}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5
          }}
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Profile Explorer
          </Link>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAdmin && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/admin"
              sx={{
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              Admin Panel
            </Button>
          )}
          
          <Button 
            color="inherit"
            onClick={() => setIsAdmin(!isAdmin)}
            sx={{
              background: isAdmin ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            {isAdmin ? 'Exit Admin' : 'Admin Login'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;