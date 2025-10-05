import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function GrabButton({
  meat_grams,
  vegetable_grams,
  carbohydrates_grams,
  dairy_grams,
  dessert_grams,
}: {
  meat_grams: number;
  vegetable_grams: number;
  carbohydrates_grams: number;
  dairy_grams: number;
  dessert_grams: number;
}) {
  const [open, setOpen] = useState(false);
  const [pickupAmounts, setPickupAmounts] = useState({
    meat: "",
    vegetables: "",
    carbohydrates: "",
    dairy: "",
    dessert: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPickupAmounts((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Grab Food
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            color: "text.primary",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "text.primary" }}
          >
            Food Available
          </Typography>
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            {`Meat: ${meat_grams}g`}
            <br />
            {`Vegetables: ${vegetable_grams}g`}
            <br />
            {`Carbohydrates: ${carbohydrates_grams}g`}
            <br />
            {`Dairy: ${dairy_grams}g`}
            <br />
            {`Dessert: ${dessert_grams}g`}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Meat (g)"
              name="meat"
              value={pickupAmounts.meat}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Vegetables (g)"
              name="vegetables"
              value={pickupAmounts.vegetables}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Carbohydrates (g)"
              name="carbohydrates"
              value={pickupAmounts.carbohydrates}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Dairy (g)"
              name="dairy"
              value={pickupAmounts.dairy}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Dessert (g)"
              name="dessert"
              value={pickupAmounts.dessert}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
