import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#14213d',
    },
    secondary: {
      main: '#fca311',
    },
    grey: {
      300: '#e5e5e5'
    }
  },
});

export default theme;