    import React, { useEffect, useRef } from 'react';
    import { Line } from 'react-chartjs-2';
    import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

    ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

    const GradientChart = ({ data, options }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
        const ctx = chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
        gradient.addColorStop(1, 'rgba(153, 102, 255, 0.6)');

        chart.data.datasets[0].backgroundColor = gradient;
        chart.update();
        }
    }, []);

    const chartData = {
        labels: data.labels,
        datasets: [
        {
            label: 'Dataset 1',
            data: data.values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
        },
        ],
    };

    return <Line ref={chartRef} data={chartData} options={options} />;
    };

    export default GradientChart;
