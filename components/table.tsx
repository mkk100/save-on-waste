"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  businessName: string,
  address: string,
  meat: number,
  vegetables: number,
  carbohydrates: number,
  dairy: number,
  dessert: number
) {
  return { businessName, address, meat, vegetables, carbohydrates, dairy, dessert };
}

const rows = [
  createData("Green Bistro", "123 Main St", 25, 18, 32, 9, 11),
  createData("Fresh Market", "456 Oak Ave", 41, 23, 27, 15, 8),
  createData("Urban Cafe", "789 Pine Rd", 19, 31, 16, 22, 19),
  createData("Corner Deli", "321 Elm St", 33, 14, 29, 11, 7),
  createData("Sunset Restaurant", "654 Maple Dr", 8, 0, 3, 18, 14),
];

export default function FoodWasteTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="food waste table">
        <TableHead>
          <TableRow>
            <TableCell>Business Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Meat&nbsp;(g)</TableCell>
            <TableCell align="right">Vegetables&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Dairy&nbsp;(g)</TableCell>
            <TableCell align="right">Dessert&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.businessName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.businessName}
              </TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right">{row.meat}</TableCell>
              <TableCell align="right">{row.vegetables}</TableCell>
              <TableCell align="right">{row.carbohydrates}</TableCell>
              <TableCell align="right">{row.dairy}</TableCell>
              <TableCell align="right">{row.dessert}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
