import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd600',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#0b1a39',
      paper: '#1B305B',
    },
  },
});

export default theme;
