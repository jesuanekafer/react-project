    import React from 'react';
    import Chart from 'react-apexcharts';
    import { Box } from '@mui/material';

    const Dashboard = ({ filters, chartOptions }) => {
    return (
        <Box>
        {chartOptions && chartOptions.series && (
            <Chart
            options={chartOptions}
            series={chartOptions.series}
            type={chartOptions.chart.type}
            height={350}
            />
        )}
        </Box>
    );
    };

    export default Dashboard;
