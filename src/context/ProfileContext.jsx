
"use client"; 

import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProfiles, createProfile, updateProfile, deleteProfile } from '../services/api';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch profiles on mount
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await fetchProfiles();
        setProfiles(data);
        setFilteredProfiles(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  // Add new profile
  const addProfile = async (profile) => {
    try {
      const newProfile = await createProfile(profile);
      setProfiles(prev => [...prev, newProfile]);
      setFilteredProfiles(prev => [...prev, newProfile]);
      return newProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update existing profile
  const updateProfile = async (id, updatedData) => {
    try {
      const updatedProfile = await updateProfile(id, updatedData);
      setProfiles(prev => 
        prev.map(profile => profile.id === id ? updatedProfile : profile)
      );
      setFilteredProfiles(prev => 
        prev.map(profile => profile.id === id ? updatedProfile : profile)
      );
      return updatedProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete profile
  const deleteProfile = async (id) => {
    try {
      await deleteProfile(id);
      setProfiles(prev => prev.filter(profile => profile.id !== id));
      setFilteredProfiles(prev => prev.filter(profile => profile.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Filter profiles by search term
  const filterProfiles = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProfiles(profiles);
      return;
    }

    const filtered = profiles.filter(profile => {
      const searchLower = searchTerm.toLowerCase();
      return (
        profile.name.toLowerCase().includes(searchLower) ||
        profile.description.toLowerCase().includes(searchLower) ||
        profile.address.city.toLowerCase().includes(searchLower) ||
        profile.address.country.toLowerCase().includes(searchLower)
      );
    });

    setFilteredProfiles(filtered);
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        filteredProfiles,
        loading,
        error,
        selectedProfile,
        setSelectedProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        filterProfiles,
        isAdmin,
        setIsAdmin
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => useContext(ProfileContext);