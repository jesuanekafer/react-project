    import React, { useContext } from 'react';
    import { Box, IconButton, useTheme } from '@mui/material';
    import { ColorModeContext } from '../../theme';
    import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
    import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

    const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="flex-end" p={2}>
        <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
            <LightModeOutlinedIcon />
            ) : (
            <DarkModeOutlinedIcon />
            )}
        </IconButton>
        </Box>
    );
    };

    export default Topbar;
