import React from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar'; 
import Dashboard from './scenes/dashboard/';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box display="flex">
            {/* Sidebar */}
            <Sidebar
              setFilters={() => {}} // Adapte conforme necessário
              setSelectedCharts={() => {}} // Adapte conforme necessário
            />
            <Box
              sx={{
                flexGrow: 1,
                marginLeft: '250px', // Ajuste conforme a largura do Sidebar
                padding: '20px',
              }}
            >
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
