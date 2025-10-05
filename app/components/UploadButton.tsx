'use client';

import { Button, Modal, Box, Typography, Zoom, TextField, Select, MenuItem, FormControl, Chip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const modalStyle = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  position: 'relative',
};

const foodCategories = ['Meat', 'Dairy', 'Vegetables', 'Carbs'];

export default function UploadButton() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryEntries, setCategoryEntries] = useState<Array<{ category: string; weight: string }>>([]);
  const [address, setAddress] = useState('');

  const canSubmit =
    address.trim().length > 0 &&
    categoryEntries.length > 0 &&
    categoryEntries.every(({ weight }) => {
      const value = Number(weight);
      return Number.isFinite(value) && value > 0;
    });

  const handleCategoryChange = (value: string) => {
    if (value) {
      setCategoryEntries((prev) => {
        if (prev.some((entry) => entry.category === value)) {
          return prev;
        }
        return [...prev, { category: value, weight: '' }];
      });
    }
    setSelectedCategory('');
  };

  const handleCategoryWeightChange = (category: string, weight: string) => {
    setCategoryEntries((prev) =>
      prev.map((entry) =>
        entry.category === category ? { ...entry, weight } : entry
      )
    );
  };

  const handleRemoveCategory = (category: string) => {
    setCategoryEntries((prev) => prev.filter((entry) => entry.category !== category));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log('Address:', address);
    console.log('Category weights:', categoryEntries);
    
    // Always clear data
    setAddress('');
    setCategoryEntries([]);
    setSelectedCategory('');
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Upload
      </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
          <Zoom in={open}>
            <Box sx={modalStyle}>
              {/* Close button in top right corner */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'grey.500',
                  '&:hover': {
                    color: 'grey.700',
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" sx={{ mb: 3, pr: 5 }} color='black'>
                Enter Details
              </Typography>

              <Typography variant="body1">Address:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                sx={{ mb: 2 }}
              />

              <Typography variant="body1">Category of food:</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  displayEmpty
                  renderValue={(value) =>
                    value ? value : <Typography color="text.secondary">Choose a category</Typography>
                  }
                >
                  {foodCategories.map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                      disabled={categoryEntries.some((entry) => entry.category === category)}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {categoryEntries.length > 0 ? (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Selected categories:</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {categoryEntries.map(({ category, weight }) => (
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
                          required
                          value={weight}
                          onChange={(e) => handleCategoryWeightChange(category, e.target.value)}
                          inputProps={{ min: 0, step: 'any' }}
                          sx={{ flexGrow: 1 }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Select a category to start tracking its weight.
                </Typography>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  disabled={!canSubmit}
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
