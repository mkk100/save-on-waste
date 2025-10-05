'use client';

import { Button, Modal, Box, Typography, Zoom, TextField, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { useState } from 'react';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

const foodCategories = ['Meat', 'Dairy', 'Vegetables', 'Carbs'];

export default function UploadButton() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addedCategories, setAddedCategories] = useState<string[]>([]);
  const [foodWeight, setFoodWeight] = useState('');
  const [address, setAddress] = useState('');

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value && !addedCategories.includes(value)) {
      setAddedCategories([...addedCategories, value]);
    }
  };

  const handleConfirm = () => {
    console.log('Address:', address);
    console.log('Categories:', addedCategories);
    console.log('Weight:', foodWeight);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Upload
      </Button>
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Zoom in={open}>
          <Box sx={modalStyle}>
            <Typography variant="h6" sx={{ mb: 3 }} color='black'>
              Enter Details
            </Typography>

            <Typography variant="body1">Address:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              sx={{ mb: 2 }}
            />

            <Typography variant="body1">Category of food:</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select food category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                label="Select category"
              >
                {foodCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {addedCategories.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Selected categories:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {addedCategories.map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      onDelete={() => setAddedCategories(addedCategories.filter(c => c !== category))}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
            
            <Typography variant="body1">Weight of food (kgs):</Typography>
            <TextField
              fullWidth
              type="number"
              value={foodWeight}
              onChange={(e) => setFoodWeight(e.target.value)}
              placeholder="Enter weight in kg"
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleConfirm}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#45a049' },
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Zoom>
      </Modal>
    </>
  );
}