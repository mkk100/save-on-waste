import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Row = {
  charity_name: string;
  meat_grams_taken: number;
  vegetables_grams_taken: number;
  carbohydrates_grams_taken: number;
  dairy_grams_taken: number;
  dessert_grams_taken: number;
  time_taken: string; // ISO timestamp
  pickup_time: string | null; // ISO timestamp or null
};

function createRow(
  charity_name: string,
  meat_grams_taken: number,
  vegetables_grams_taken: number,
  carbohydrates_grams_taken: number,
  dairy_grams_taken: number,
  dessert_grams_taken: number,
  time_taken: string,
  pickup_time: string | null
): Row {
  return {
    charity_name,
    meat_grams_taken,
    vegetables_grams_taken,
    carbohydrates_grams_taken,
    dairy_grams_taken,
    dessert_grams_taken,
    time_taken,
    pickup_time,
  };
}

const rows: Row[] = [
  createRow(
    "Myo's Charity",
    120,
    80,
    150,
    40,
    20,
    "2025-10-05T09:30:00Z",
    "2025-10-05T10:00:00Z"
  ),
  createRow(
    "Lynn's Charity",
    200,
    50,
    120,
    60,
    10,
    "2025-10-04T14:20:00Z",
    null
  ),
  createRow(
    "Min's Charity",
    0,
    20,
    0,
    0,
    5,
    "2025-10-03T18:45:00Z",
    "2025-10-03T19:00:00Z"
  ),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} size="small" aria-label="donation table">
        <TableHead>
          <TableRow>
            <TableCell>Charity Name</TableCell>
            <TableCell align="right">Meat (g)</TableCell>
            <TableCell align="right">Vegetables (g)</TableCell>
            <TableCell align="right">Carbohydrates (g)</TableCell>
            <TableCell align="right">Dairy (g)</TableCell>
            <TableCell align="right">Dessert (g)</TableCell>
            <TableCell align="right">Time Taken</TableCell>
            <TableCell align="right">Pickup Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.charity_name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.charity_name}
              </TableCell>
              <TableCell align="right">{row.meat_grams_taken}</TableCell>
              <TableCell align="right">{row.vegetables_grams_taken}</TableCell>
              <TableCell align="right">
                {row.carbohydrates_grams_taken}
              </TableCell>
              <TableCell align="right">{row.dairy_grams_taken}</TableCell>
              <TableCell align="right">{row.dessert_grams_taken}</TableCell>
              <TableCell align="right">
                {new Date(row.time_taken).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {row.pickup_time
                  ? new Date(row.pickup_time).toLocaleString()
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
