import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <MonetizationOnIcon
            sx={{
              marginRight: '1rem',
            }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IA USD
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}