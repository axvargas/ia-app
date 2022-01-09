
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e31c60',
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;