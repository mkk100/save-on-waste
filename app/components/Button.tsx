'use client';

import { Button, Modal, Box, Typography } from '@mui/material';
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
};

export default function UploadButton() {
  const [open, setOpen] = useState(false);

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
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload File
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Select a file to upload to the system.
          </Typography>
          {/* Add your upload form content here */}
        </Box>
      </Modal>
    </>
  );
}