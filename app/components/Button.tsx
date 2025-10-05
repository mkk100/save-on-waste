'use client';

import { Button, Modal, Box, Typography, Slide, TextField } from '@mui/material';
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
  outline: 'none', // Remove focus outline
};

export default function UploadButton() {
  const [open, setOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [foodWeight, setFoodWeight] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                Upload Food Details
            </Typography>

              <Typography variant="body1">Category of food:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={foodCategory}
                onChange={(e) => setFoodCategory(e.target.value)}
                placeholder="Enter food category"
              />
              
              <Typography variant="body1">Weight of food (kgs):</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={foodWeight}
                onChange={(e) => setFoodWeight(e.target.value)}
                placeholder="Enter weight in kg"
              />
            </Box>
        </Slide>
      </Modal>
    </>
  );
}