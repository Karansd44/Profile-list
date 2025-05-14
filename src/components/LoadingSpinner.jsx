import { CircularProgress, Box } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
const LoadingSpinner = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh' 
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <CircularProgress 
          size={80} 
          thickness={4}
          sx={{
            color: 'primary.main',
            animationDuration: '1s'
          }}
        />
      </motion.div>
    </Box>
  );
};

export default LoadingSpinner;