import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '../components/core/GlobalStyles';

const ColorModeContext = React.createContext(() => {});

// TODO: Sumeet declare theme typescript. ref: https://mui.com/customization/theming/
const ThemeProviderCustom: React.FC = (props) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode.toggleColorMode}>
        <GlobalStyles />
        {props.children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
};

export default ThemeProviderCustom;
