import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


function format(num) {
  return `$ ${num.toFixed(2)}`;
}

function subtotal(coin, qty) {
  return coin * qty;
}


function total(data) {
  return Object.keys(data).map((coin) => subtotal(coinValue[coin], data[coin])).reduce((sum, i) => sum + i, 0);
}

const coinName = { 
  "one_cent": "One Cent", 
  "five_cents": "Five Cents", 
  "ten_cents": "Ten Cents",
  "twenty_five_cents": "Twenty Five Cents",
  "fifty_cents": "Fifty Cents", 
  "one_dollar": "One Dollar"
}
const coinValue = { 
  "one_cent": 0.01, 
  "five_cents": 0.05, 
  "ten_cents": 0.10,
  "twenty_five_cents": 0.25,
  "fifty_cents": 0.50,
  "one_dollar": 1.00
}

export default function ResultTable(props) {
  const { data } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="result table">
        <TableHead>
          <TableRow>
            <TableCell> <Box sx={{ fontWeight: 'bold' }}>Coin</Box> </TableCell>
            <TableCell align="right"><Box sx={{ fontWeight: 'bold' }}>Qty.</Box></TableCell>
            <TableCell align="right"><Box sx={{ fontWeight: 'bold' }}>Sum</Box></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map((coin) => (
            <TableRow key={coin}>
              <TableCell>{coinName[coin]}</TableCell>
              <TableCell align="right">{data[coin]}</TableCell>
              <TableCell align="right">{format(subtotal(coinValue[coin], data[coin]))}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={1}><Box sx={{ fontWeight: 'bold' }}>Total</Box></TableCell>
            <TableCell align="right"><Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>{format(total(data))}</Box></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}