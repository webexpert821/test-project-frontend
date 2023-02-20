import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { COLORS, TEXT_SIZE } from './config/config';
import store from './store';
import StoreProvider from './context/StoreContext';

interface ProviderProps {
  children: React.ReactNode;
}

const theme = {
  ...COLORS,
  ...TEXT_SIZE
};

export const AppProvider = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <Provider store={store}>{children}</Provider>
      </StoreProvider>
    </ThemeProvider>
  );
};
