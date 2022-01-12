import { forwardRef } from 'react'
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

import ResultTable from './ResultTable';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResultDialog(props) {
  const { 
    open,
    loading,
    fileError,
    data,
    handleClose
  } = props;

  if(fileError){
    console.log('File Error: ', fileError)
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
          <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Resultado
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Progress bar while loading */}
        {loading && (
          <Stack 
            alignItems="center"
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
            }}>
            <CircularProgress/>
            <Box
              sx={{
                typography: 'subtitle2',
                textAlign: 'center',
                margin: '.5rem',
              }}>
              Estamos contando su dinero, espere un momento &#x1F600;
            </Box>
          </Stack>
        )}
        {/* Result */}
        {
          data && (
            <ResultTable data={data} />
          )
        }
        {
          fileError && (
            <Box>
              Error al procesar el archivo
            </Box>
          )
        }
      </Dialog>
    </div>
  );
}