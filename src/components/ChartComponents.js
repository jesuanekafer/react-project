import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const ChartComponent = ({ chartType, column, color }) => {
    const [chartData, setChartData] = useState({ categories: [], data: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/unique_counts/${column}`);
                const data = response.data.unique_counts;
                setChartData({
                    categories: Object.keys(data),
                    data: Object.values(data),
                });
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [column]);

    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(`hsl(${(i * 360 / numColors)}, 70%, 50%)`);
        }
        return colors;
    };

    const options = {
        chart: {
            type: chartType,
            height: 350,
        },
        colors: [color],
        xaxis: { categories: chartData.categories },
    };

    const series = [
        {
            name: "Quantidade",
            data: chartData.data,
        },
    ];

    if (chartType === 'pie') {
        options.labels = chartData.categories;
        options.colors = generateColors(chartData.data.length);
    }

    return <ApexCharts options={options} series={series} type={chartType} height={350} />;
};

export default ChartComponent;
