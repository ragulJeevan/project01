import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './ReduxKit/store';
import React, { useEffect, useState } from 'react';
import { SnackbarProvider } from './Components/ShowMessage';
import { Box } from '@mui/material';
import WebLayout from './Components/WebLayout';
import MobileLayout from './Components/MobileLayout';


function App() {

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SnackbarProvider>
      <Provider store={store}>
        {isDesktop
          ?
          <Router>
            <WebLayout />
            </Router>
          :
          <Box>
            <MobileLayout />
          </Box>
        }
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
