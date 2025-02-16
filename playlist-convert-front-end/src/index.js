import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Button, createColorScheme, createTheme, ThemeProvider } from "@mui/material";
import { Provider } from 'react-redux';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));


const theme = createTheme({
    palette: {
        grey: createColorScheme('#808080')
    }
})

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>


);

