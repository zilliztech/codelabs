import { createContext } from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/system";

const { Provider } = createContext({});

const commonThemes = {
  ...Theme,
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
};

const theme = createTheme({
  ...commonThemes,
  overrides: {
    MuiTypography: {
      h1: {
        fontFamily: 'Inter',
        fontSize: '48px',
        lineHeight: '60px',
        letterSpacing: '-0.005em'
      },
      h2: {
        fontFamily: 'Inter',
        lineHeight: '42px',
        fontSize: '36px',
        letterSpacing: '-0.005em'
      },
      h3: {
        fontFamily: 'Inter',
        lineHeight: '40px',
        fontSize: '28px',
        letterSpacing: '-0.005em'
      },
      h4: {
        fontFamily: 'Inter',
        lineHeight: '36px',
        fontSize: '24px',
        letterSpacing: '-0.005em',
      },
      h5: {
        // fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: '20px',
        lineHeight: '28px',
        letterSpacing: '-0.005em',
      },
      h6: {
        fontFamily: 'Inter',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '-0.005em',
      },
      body1: {
        fontSize: '14px',
        lineHeight: '22px',
        fontFamily: 'Inter',
        letterSpacing: '-0.005em',
      },
      body2: {
        fontSize: '14px',
        lineHeight: '16px',
        fontFamily: 'Inter',
        letterSpacing: '-0.005em',
      },
    },

  },
});

const mobileTheme = createTheme({
  ...commonThemes,
  overrides: {
    MuiTypography: {
      button: {
        textTransform: 'initial',
        lineHeight: '16px',
        fontWeight: 'bold',
      },
      h1: {
        fontFamily: 'Inter',
        fontSize: '40px',
        lineHeight: '54px',
        letterSpacing: '-0.005em',
      },
      h2: {
        fontFamily: 'Inter',
        fontSize: '32px',
        lineHeight: '40px',
        letterSpacing: '-0.005em',
      },
      h3: {
        fontFamily: 'Inter',
        fontSize: '24px',
        lineHeight: '30px',
        letterSpacing: '-0.005em',
      },
      h4: {
        fontFamily: 'Inter',
        fontSize: '20px',
        lineHeight: '24px',
        letterSpacing: '-0.005em',
      },
      h5: {
        // fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '-0.005em',
      },
      h6: {
        fontFamily: 'Inter',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '-0.005em',
      },
      body1: {
        fontFamily: 'Inter',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '-0.005em',
      },
      body2: {
        fontFamily: 'Inter',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '-0.005em',
      },
    },

  },
});


const RootProvider = (props) => {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </Provider>
  );
};

export default RootProvider;
