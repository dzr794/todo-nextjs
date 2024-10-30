import { createTheme } from '@mui/material/styles';

const blue = '#00254b'
const lightBlue = '#004982'
const darkBlue = '#001F3F'

const orange ='#f58b33'

const white = '#E7EBEE'
const white_alpha_05 = 'rgba(231,235,238,0.05)'
const white_alpha_10 = 'rgba(231,235,238,0.1)'
const white_alpha_20 = 'rgba(231,235,238,0.2)'
const white_alpha_30 = 'rgba(231,235,238,0.3)'
const white_alpha_40 = 'rgba(231,235,238,0.4)'
const white_alpha_50 = 'rgba(231,235,238,0.5)'
const white_alpha_60 = 'rgba(231,235,238,0.6)'
const white_alpha_70 = 'rgba(231,235,238,0.7)'
const white_alpha_80 = 'rgba(231,235,238,0.8)'
const white_alpha_90 = 'rgba(231,235,238,0.9)'
const white_alpha_100 = 'rgba(231,235,238,1)'

const black = '#3C3C3B'

const warningColor = '#FCBA00'
const errorColor = '#EB5C37'
const successColor = '#52ae31'
const infoColor = '#008dff'



const theme = createTheme(
  {
  palette: {
    mode: 'dark',
    common: {
      black: black,
      white: white,
    },
    primary: {
      main: blue,
      light: lightBlue,
      dark: darkBlue,
      contrastText: white,
    },
    secondary: {
      main: orange,
      contrastText: white
    },
    
    background: {
      default: 'rgba(0,37,75,0.5)',
      paper: white_alpha_10,
    },
    warning: {
      main: warningColor,
    },
    success: {
      main: successColor,
      contrastText: white
    },
    error: {
      main: errorColor,
    },
    info: {
      main: infoColor
    },
    text: {
      primary: white,
      secondary: white,
      disabled: white_alpha_50,
    },

    divider: white_alpha_10,
    
    
  },
  typography: {
    fontFamily: 'Roboto',
    
    
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    fontSize: 12,
    h2: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 200,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.9rem',
    },
    body2: {
      fontSize: '0.9rem',
      fontWeight: 100,
    },
    caption: {
      fontSize: '10px',
      fontWeight: 400,
    },
  },
  
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
}
);

export default theme;
