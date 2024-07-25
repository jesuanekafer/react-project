    import React from 'react';
    import { Bar } from 'react-chartjs-2';
    import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const BarChart = ({ data, options }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
        {
            label: 'Dataset 1',
            data: data.values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        ],
    };

    return <Bar data={chartData} options={options} />;
    };

    export default BarChart;
