import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './pages/App.tsx';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import { theme } from './theme.ts'

const base = '/5.2.5_Ruslan_Leontev/';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </Provider>
  // </StrictMode>,
)
