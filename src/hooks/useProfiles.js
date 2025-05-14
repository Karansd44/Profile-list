import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};