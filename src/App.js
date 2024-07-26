import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar'; 
import Dashboard from './scenes/dashboard/';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [theme, colorMode] = useMode();
  const [filters, setFilters] = useState({ startDate: new Date(), endDate: new Date() });
  const [chartOptions, setChartOptions] = useState({});

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box display="flex">
            <Sidebar
              setFilters={setFilters}
              setChartOptions={setChartOptions}
            />
            <Box
              sx={{
                flexGrow: 1,
                marginLeft: (theme) => (theme.spacing(30)), // Adjust based on Sidebar width
                padding: '20px',
                transition: 'margin-left 0.3s',
              }}
            >
              <Topbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Dashboard
                      filters={filters}
                      chartOptions={chartOptions} // Pass the chartOptions to Dashboard
                    />
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
