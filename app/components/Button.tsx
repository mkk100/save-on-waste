'use client';

import { Button, Modal, Box, Typography, Slide, TextField, Select, MenuItem, FormControl, InputLabel, Chip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor : 'background.paper',
//   background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 25%, #66BB6A 50%, #4CAF50 75%, #2E7D32 100%)',
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddCategory = () => {
    if (selectedCategory && !addedCategories.includes(selectedCategory)) {
      setAddedCategories([...addedCategories, selectedCategory]);
      setSelectedCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setAddedCategories(addedCategories.filter(category => category !== categoryToRemove));
  };

  const handleConfirm = () => {
    // Handle form submission here
    console.log('Categories:', addedCategories);
    console.log('Weight:', foodWeight);
    // Close modal after confirmation
    handleClose();
  };

  return (
    <>
      <Button 
        variant="contained" 
        onClick={handleOpen}
      >
        Upload
      </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box sx={modalStyle}>

            <Typography id="modal-modal-title" variant="h6" component="h2" color='black' sx={{ mb: 3 }}>
                Enter Details
            </Typography>

              <Typography variant="body1">Category of food:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FormControl variant="outlined" sx={{ flex: 1 }}>
                  <InputLabel>Select category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Select category"
                  >
                    {foodCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton 
                  onClick={handleAddCategory} 
                  color="primary"
                  disabled={!selectedCategory || addedCategories.includes(selectedCategory)}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              {/* Display added categories */}
              {addedCategories.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Selected categories:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {addedCategories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        onDelete={() => handleRemoveCategory(category)}
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
                variant="outlined"
                type="number"
                value={foodWeight}
                onChange={(e) => setFoodWeight(e.target.value)}
                placeholder="Enter weight in kg"
                sx={{ mb: 3 }}
              />

              {/* Confirm button at bottom right */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': {
                      backgroundColor: '#45a049',
                    },
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
        </Slide>
      </Modal>
    </>
  );
}