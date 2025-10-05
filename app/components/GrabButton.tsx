"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

export type GrabButtonProps = {
  meat_grams: number;
  vegetable_grams: number;
  carbohydrates_grams: number;
  dairy_grams: number;
  dessert_grams: number;
};

export default function GrabButton({
  meat_grams,
  vegetable_grams,
  carbohydrates_grams,
  dairy_grams,
  dessert_grams,
}: GrabButtonProps) {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [pickupAmounts, setPickupAmounts] = useState({
    meat: "",
    vegetables: "",
    carbohydrates: "",
    dairy: "",
    dessert: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAlertMessage(null);
  };

  const safeUpdatePickup = (name: keyof typeof pickupAmounts, value: string) => {
    setPickupAmounts((prev) => ({ ...prev, [name]: value }));
    if (alertMessage) {
      setAlertMessage(null);
    }
  };

  const validateInput = (label: string, rawValue: string, maxValue: number) => {
    if (rawValue === "") {
      return true;
    }

    const numericValue = Number(rawValue);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
      setAlertMessage(`Enter a non-negative number for ${label}.`);
      return false;
    }

    if (numericValue > maxValue) {
      setAlertMessage(`You cannot pick more than ${maxValue}g of ${label}.`);
      return false;
    }

    return true;
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
            width: 620,
            bgcolor: "background.paper",
            color: "text.primary",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        > 
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
          <Typography variant="h6" component="h2" sx={{ color: "text.primary" }}>
            Food Available
          </Typography>

          {alertMessage && (
            <Alert
              variant="filled"
              severity="error"
              sx={{ mt: 2, mb: 2 }}
              onClose={() => setAlertMessage(null)}
            >
              {alertMessage}
            </Alert>
          )}

          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Meat */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "text.secondary", minWidth: "120px" }}>
              Meat:
              </Typography>
              <TextField
              name="meat"
              value={pickupAmounts.meat || meat_grams.toString()}
              onChange={(e) => {
                const value = e.target.value;
                if (validateInput("meat", value, meat_grams)) {
                safeUpdatePickup("meat", value);
                }
              }}
              size="small"
              type="number"
              inputProps={{ max: meat_grams, min: 0 }}
              sx={{ flex: 1 }}
              />
            </Box>

            {/* Vegetables */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "text.secondary", minWidth: "120px" }}>
                Vegetables:
              </Typography>
              <TextField
                name="vegetables"
                value={pickupAmounts.vegetables || vegetable_grams.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (validateInput("vegetables", value, vegetable_grams)) {
                    safeUpdatePickup("vegetables", value);
                  }
                }}
                size="small"
                type="number"
                inputProps={{ max: vegetable_grams, min: 0 }}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Carbohydrates */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "text.secondary", minWidth: "120px" }}>
                Carbohydrates:
              </Typography>
              <TextField
                name="carbohydrates"
                value={pickupAmounts.carbohydrates || carbohydrates_grams.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (validateInput("carbohydrates", value, carbohydrates_grams)) {
                    safeUpdatePickup("carbohydrates", value);
                  }
                }}
                size="small"
                type="number"
                inputProps={{ max: carbohydrates_grams, min: 0 }}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Dairy */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "text.secondary", minWidth: "120px" }}>
                Dairy:
              </Typography>
              <TextField
                name="dairy"
                value={pickupAmounts.dairy || dairy_grams.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (validateInput("dairy", value, dairy_grams)) {
                    safeUpdatePickup("dairy", value);
                  }
                }}
                size="small"
                type="number"
                inputProps={{ max: dairy_grams, min: 0 }}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Dessert */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "text.secondary", minWidth: "120px" }}>
                Dessert:
              </Typography>
              <TextField
                name="dessert"
                value={pickupAmounts.dessert || dessert_grams.toString()} 
                onChange={(e) => {
                  const value = e.target.value;
                  if (validateInput("dessert", value, dessert_grams)) {
                    safeUpdatePickup("dessert", value);
                  }
                }}
                size="small"
                type="number"
                inputProps={{ max: dessert_grams, min: 0 }}
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                backgroundColor: '#4CAF50',
                '&:hover': { backgroundColor: '#45a049' },
                fontSize: '1rem',
                padding: '8px 32px',
                }}
              >
                Grab
              </Button>
            </Box>
        </Box>
      </Modal>
    </>
  );
}
