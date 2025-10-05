'use client';

import { Button, Modal, Box, Typography, Zoom, TextField, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { useState } from 'react';

const modalStyle = {
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
  const [categoryWeights, setCategoryWeights] = useState<Record<string, string>>({});
  const [address, setAddress] = useState('');

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (!value) {
      return;
    }

    setAddedCategories((prev) => {
      if (prev.includes(value)) {
        return prev;
      }
      return [...prev, value];
    });

    setCategoryWeights((prev) => {
      if (prev[value] !== undefined) {
        return prev;
      }
      return { ...prev, [value]: '' };
    });
  };

  const handleCategoryWeightChange = (category: string, weight: string) => {
    setCategoryWeights((prev) => ({ ...prev, [category]: weight }));
  };

  const handleRemoveCategory = (category: string) => {
    setAddedCategories((prev) => prev.filter((c) => c !== category));
    setCategoryWeights((prev) => {
      const { [category]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const handleConfirm = () => {
    console.log('Address:', address);
    console.log('Category weights:', addedCategories.map((category) => ({
      category,
      weight: categoryWeights[category] ?? '',
    })));
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
      >
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
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
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Selected categories:</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {addedCategories.map((category) => (
                    <Box key={category} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={category}
                        onDelete={() => handleRemoveCategory(category)}
                        color="primary"
                        variant="outlined"
                      />
                      <TextField
                        label="Weight (kg)"
                        type="number"
                        fullWidth
                        value={categoryWeights[category] ?? ''}
                        onChange={(e) => handleCategoryWeightChange(category, e.target.value)}
                        inputProps={{ min: 0, step: 'any' }}
                        sx={{ flexGrow: 1 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
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
        </Box>
      </Modal>
    </>
  );
}
