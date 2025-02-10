import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Cambia a modo oscuro
    background: {
      default: '#121212', // Fondo oscuro
      paper: '#1e1e1e',   // Fondo de componentes como Paper, Card, etc.
    },
    text: {
      primary: '#ffffff', // Texto principal en color claro
      secondary: '#b3b3b3', // Texto secundario
    },
  },
});