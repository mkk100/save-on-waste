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

type PickupField = "meat" | "vegetables" | "carbohydrates" | "dairy" | "dessert";

type PickupState = Record<PickupField, string>;

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
  const [alertMessages, setAlertMessages] = useState<string[]>([]);
  const [pickupAmounts, setPickupAmounts] = useState<PickupState>({
    meat: "",
    vegetables: "",
    carbohydrates: "",
    dairy: "",
    dessert: "",
  });

  const handleOpen = () => {
    setPickupAmounts({
      meat: String(meat_grams ?? 0),
      vegetables: String(vegetable_grams ?? 0),
      carbohydrates: String(carbohydrates_grams ?? 0),
      dairy: String(dairy_grams ?? 0),
      dessert: String(dessert_grams ?? 0),
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAlertMessages([]);
  };

  const safeUpdatePickup = (name: keyof typeof pickupAmounts, value: string) => {
    setPickupAmounts((prev) => ({ ...prev, [name]: value }));
    if (alertMessages.length > 0) {
      setAlertMessages([]);
    }
  };

  const labelMap: Record<PickupField, string> = {
    meat: "Meat",
    vegetables: "Vegetables",
    carbohydrates: "Carbohydrates",
    dairy: "Dairy",
    dessert: "Dessert",
  };

  const handleGrab = () => {
    // Check all validations before proceeding
    const maxValues = {
      meat: meat_grams,
      vegetables: vegetable_grams,
      carbohydrates: carbohydrates_grams,
      dairy: dairy_grams,
      dessert: dessert_grams,
    };

    const errors: string[] = [];

    (Object.entries(pickupAmounts) as Array<[PickupField, string]>).forEach(
      ([category, value]) => {
        const maxValue = maxValues[category];
        if (value === "") {
          return;
        }

        const numericValue = Number(value);

        if (!Number.isFinite(numericValue) || numericValue < 0) {
          errors.push(`Enter a non-negative number for ${labelMap[category]}.`);
          return;
        }

        if (numericValue > maxValue) {
          errors.push(
            `You cannot pick more than ${maxValue}g of ${labelMap[category]}.`,
          );
        }
      },
    );

    if (errors.length > 0) {
      setAlertMessages(errors);
      return;
    }

    // If all validations pass, process the grab
    console.log("Grabbed amounts:", pickupAmounts);
    handleClose();
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

          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Meat */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "text.secondary", minWidth: "120px" }}>
              Meat:
              </Typography>
              <TextField
              name="meat"
              value={pickupAmounts.meat}
              onChange={(e) => {
                const value = e.target.value;
                safeUpdatePickup("meat", value);
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
                value={pickupAmounts.vegetables}
                onChange={(e) => {
                  const value = e.target.value;
                  safeUpdatePickup("vegetables", value);
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
                value={pickupAmounts.carbohydrates}
                onChange={(e) => {
                  const value = e.target.value;
                  safeUpdatePickup("carbohydrates", value);
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
                value={pickupAmounts.dairy}
                onChange={(e) => {
                  const value = e.target.value;
                  safeUpdatePickup("dairy", value);
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
                value={pickupAmounts.dessert} 
                onChange={(e) => {
                  const value = e.target.value;
                  safeUpdatePickup("dessert", value);
                }}
                size="small"
                type="number"
                inputProps={{ max: dessert_grams, min: 0 }}
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>

          {alertMessages.length > 0 && (
            <Alert
              variant="filled"
              severity="error"
              sx={{ mt: 2, mb: 2 }}
              onClose={() => setAlertMessages([])}
            >
              <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                {alertMessages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </Box>
            </Alert>
          )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleGrab}
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