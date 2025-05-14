"use client"

import { useState, useEffect } from 'react';
import { useProfiles } from '../context/ProfileContext';
import { 
  TextField, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from "framer-motion";
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  image: Yup.string().url('Must be a valid URL').required('Required'),
  address: Yup.object({
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    lat: Yup.number().required('Required'),
    lng: Yup.number().required('Required')
  })
});

const AdminPanel = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfiles();
  const [open, setOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      address: {
        street: '',
        city: '',
        country: '',
        lat: 0,
        lng: 0
      }
    },
    validationSchema,
    onSubmit: (values) => {
      if (editingProfile) {
        updateProfile(editingProfile.id, values);
      } else {
        addProfile(values);
      }
      handleClose();
    }
  });

  useEffect(() => {
    if (editingProfile) {
      formik.setValues(editingProfile);
    }
  }, [editingProfile]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProfile(null);
    formik.resetForm();
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button 
        variant="contained" 
        onClick={handleClickOpen}
        sx={{ mb: 3 }}
      >
        Add New Profile
      </Button>
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.description.substring(0, 50)}...</TableCell>
                <TableCell>{profile.address.city}, {profile.address.country}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(profile)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteProfile(profile.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingProfile ? 'Edit Profile' : 'Add New Profile'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="image"
                  name="image"
                  label="Image URL"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="address.street"
                  name="address.street"
                  label="Street"
                  value={formik.values.address.street}
                  onChange={formik.handleChange}
                  error={formik.touched.address?.street && Boolean(formik.errors.address?.street)}
                  helperText={formik.touched.address?.street && formik.errors.address?.street}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="address.city"
                  name="address.city"
                  label="City"
                  value={formik.values.address.city}
                  onChange={formik.handleChange}
                  error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                  helperText={formik.touched.address?.city && formik.errors.address?.city}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="address.country"
                  name="address.country"
                  label="Country"
                  value={formik.values.address.country}
                  onChange={formik.handleChange}
                  error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
                  helperText={formik.touched.address?.country && formik.errors.address?.country}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  id="address.lat"
                  name="address.lat"
                  label="Latitude"
                  type="number"
                  value={formik.values.address.lat}
                  onChange={formik.handleChange}
                  error={formik.touched.address?.lat && Boolean(formik.errors.address?.lat)}
                  helperText={formik.touched.address?.lat && formik.errors.address?.lat}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  id="address.lng"
                  name="address.lng"
                  label="Longitude"
                  type="number"
                  value={formik.values.address.lng}
                  onChange={formik.handleChange}
                  error={formik.touched.address?.lng && Boolean(formik.errors.address?.lng)}
                  helperText={formik.touched.address?.lng && formik.errors.address?.lng}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={formik.handleSubmit} 
            color="primary"
            variant="contained"
          >
            {editingProfile ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default AdminPanel;