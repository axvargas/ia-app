import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';

import AppBar from './components/Appbar';
import ResultDialog from './components/ResultDialog';

const Input = styled('input')({
  display: 'none',
});


function App() {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [ratioError, setRatioError] = useState(false)
  const [fileError, setFileError] = useState(false)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  useEffect(() => {
    if (!selectedFile) {
      setPreview()
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const uploadFile = async () => {
    if (!selectedFile) {
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setData(data)
      setFileError(false)
    }
    catch (error) {
      console.error(error)
      setFileError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(e.target.files[0])
    let img = new Image()
    img.src = objectUrl
    img.onload = () => {
      if (img.width / img.height !== 1) {
        setRatioError(true)
        setSelectedFile()
      }
      else {
        setRatioError(false)
        setSelectedFile(e.target.files[0])
      }
    }
  }
  return (
    <div style={{
      height: '100vh',
    }}>
      <ResultDialog
        loading={loading}
        open={open}
        handleClose={handleClose}
        data={data}
        fileError={fileError}
      />

      <CssBaseline />
      <AppBar />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100%',
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: '300px',
            height: '300px',
            border: '1px solid #ccc',
            borderRadius: '5%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eee',
          }}
        >
          {
            preview && (
              <img
                src={preview}
                alt="preview"
                width="300"
                height="300"
                style={{
                  borderRadius: '5%',
                }}
              />
            )
          }
        </Stack>
        <Box
          sx={{
            typography: 'subtitle2',
            textAlign: 'center',
            margin: '.5rem',
          }}
        >
          Upload an image with coins to see the total amount. Use aspect ratio 1:1 in your camera
        </Box>
        {
          ratioError && (
            <Alert
              severity="error"
              sx={{
                marginTop: '1rem',
                margin: '1rem'
              }}
            >
              Use aspect ratio 1:1 in your camera
            </Alert>
          )
        }
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            marginTop: '1rem',
          }}
        >
          <label htmlFor="icon-button-file">
            <Input
              id="icon-button-file"
              accept="image/*"
              type="file"
              capture="environment"
              onChange={onSelectFile}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Stack>
        <Box mt={2}>
          <Button
            disabled={!selectedFile || ratioError}
            variant="contained"
            color="primary"
            onClick={() => {
              console.log("processing: ", selectedFile)
              handleClickOpen()
              uploadFile()
            }}
          >
            Process
          </Button>
        </Box>
      </Grid>
    </div>
  );
}

export default App;
