import React from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import Navigation from './components/Navigation';



const theme = createTheme({
  lightColors: {
    primary: '#25d366',
    secondary: '#dcf8c6',
    background: '#ece5dd'
  },
  darkColors: {
    primary: '#075e54',
    secondary: '#128c7e',
    background: '#120e0a'
  },
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 20

      }

    }
  },
  mode: 'light',
});


export default function App() {
  theme.mode = useColorScheme();
  return (
    <ThemeProvider theme={theme}>

      <Navigation></Navigation>

    </ThemeProvider>
  );
}

