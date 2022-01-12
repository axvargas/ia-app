import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


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
  "un centavo": "Un centavo", 
  "cinco centavos": "Cinco centavos",
  "diez centavos": "Diez centavos",
  "veinte cinco centavos": "Veinticinco centavos",
  "cincuenta centavos": "Cincuenta centavos",
  "un dólar": "Un dólar",
}
const coinValue = { 
  "un centavo": 0.01, 
  "cinco centavos": 0.05, 
  "diez centavos": 0.10,
  "veinte cinco centavos": 0.25,
  "cincuenta centavos": 0.50,
  "un dólar": 1.00
}

export default function ResultTable(props) {
  const { data: response } = props;
  const { prediction: data, image } = response;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="result table">
        <TableHead>
          <TableRow>
            <TableCell> <Box sx={{ fontWeight: 'bold' }}>Modena</Box> </TableCell>
            <TableCell align="right"><Box sx={{ fontWeight: 'bold' }}>Cantidad</Box></TableCell>
            <TableCell align="right"><Box sx={{ fontWeight: 'bold' }}>Suma</Box></TableCell>
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
            <TableCell rowSpan={1} />
            <TableCell colSpan={1} align='right'><Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>Total</Box></TableCell>
            <TableCell align="right"><Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>{format(total(data))}</Box></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <img src={`data:image/png;base64,${image}`} alt="coin image predicted" />
      </Grid>
    </TableContainer>
  );
}