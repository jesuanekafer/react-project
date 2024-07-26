import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Box, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { tokens } from "../../theme";
import Logo from '../../assets/img-logo.png'; 
import './sidebar.css';

const Sidebar = ({ setFilters, setChartOptions }) => {
    const colors = tokens("dark");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [columns, setColumns] = useState([]);
    const [filteredColumns, setFilteredColumns] = useState([]);
    const [chartType, setChartType] = useState('bar');
    const [selectedColumn, setSelectedColumn] = useState('');
    const [chartColor, setChartColor] = useState('#00E396'); 

    useEffect(() => {
        fetchColumns();
    }, []);

    useEffect(() => {
        if (selectedColumn) {
            fetchChartData();
        }
    }, [selectedColumn, startDate, endDate]);

    const fetchColumns = () => {
        Papa.parse('/CTE.csv', {
            download: true,
            header: true,
            complete: (results) => {
                if (results.data.length > 0) {
                    setColumns(Object.keys(results.data[0]));
                    setFilteredColumns(Object.keys(results.data[0]));
                }
            },
            error: (error) => {
                console.error("Erro ao ler o CSV:", error);
            }
        });
    };

    const fetchChartData = () => {
        Papa.parse('/CTE.csv', {
            download: true,
            header: true,
            complete: (results) => {
                if (results.data.length > 0) {
                    const data = results.data.filter(row => {
                        const date = new Date(row.Date); // Supondo que a coluna de data se chama 'Date'
                        return date >= startDate && date <= endDate;
                    });
                    const columnData = data.map(row => row[selectedColumn]);

                    const uniqueCounts = columnData.reduce((acc, value) => {
                        acc[value] = (acc[value] || 0) + 1;
                        return acc;
                    }, {});

                    setChartOptions({
                        chart: {
                            type: chartType,
                            height: 350
                        },
                        colors: [chartColor],
                        xaxis: {
                            categories: Object.keys(uniqueCounts)
                        },
                        series: [
                            {
                                name: "Quantidade",
                                data: Object.values(uniqueCounts)
                            }
                        ]
                    });
                }
            },
            error: (error) => {
                console.error("Erro ao buscar dados:", error);
                setChartOptions({ categories: [], data: [] });
            }
        });
    };

    const handleDateChange = (date, type) => {
        if (type === 'start') {
            setStartDate(date);
            setFilters({ startDate: date, endDate: endDate });
        } else {
            setEndDate(date);
            setFilters({ startDate: startDate, endDate: date });
        }
    };

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
    };

    const handleColorChange = (event) => {
        setChartColor(event.target.value);
    };

    return (
        <Box
            sx={{
                width: isCollapsed ? 60 : 250,
                height: '100vh',
                background: `${colors.primary[500]} !important`,
                padding: '20px',
                position: 'fixed',
                transition: 'width 0.3s',
                overflowX: 'hidden',
            }}
        >
            <Box display="flex" justifyContent="center" mb="20px">
                <img src={Logo} alt="Logo" style={{ width: isCollapsed ? 40 : 175, transition: 'width 0.3s' }} />
            </Box>
            {!isCollapsed && (
                <Box>
                    <Box mb="20px">
                        <Typography variant="h6" color="white">Selecione a coluna:</Typography>
                        <FormControl fullWidth variant="filled">
                            <InputLabel id="column-select-label" sx={{ color: 'white' }}>Coluna</InputLabel>
                            <Select
                                labelId="column-select-label"
                                id="column-select"
                                value={selectedColumn}
                                onChange={handleColumnChange}
                                sx={{
                                    color: 'white',
                                    '.MuiSvgIcon-root': { color: 'white' },
                                    '.MuiInputBase-root': { color: 'white' },
                                    '.MuiFilledInput-root': { backgroundColor: 'transparent' }
                                }}
                            >
                                {filteredColumns.map((column) => (
                                    <MenuItem key={column} value={column}>{column}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mb="20px">
                        <Typography variant="h6" color="white">Selecione o tipo de gráfico:</Typography>
                        <FormControl fullWidth variant="filled">
                            <InputLabel id="chart-type-label" sx={{ color: 'white' }}>Tipo de Gráfico</InputLabel>
                            <Select
                                labelId="chart-type-label"
                                id="chart-type"
                                value={chartType}
                                onChange={handleChartTypeChange}
                                sx={{
                                    color: 'white',
                                    '.MuiSvgIcon-root': { color: 'white' },
                                    '.MuiInputBase-root': { color: 'white' },
                                    '.MuiFilledInput-root': { backgroundColor: 'transparent' }
                                }}
                            >
                                <MenuItem value="bar">Gráfico de Barras</MenuItem>
                                <MenuItem value="line">Gráfico de Linhas</MenuItem>
                                <MenuItem value="pie">Gráfico de Pizza</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mb="20px">
                        <Typography variant="h6" color="white">Selecione a cor do gráfico:</Typography>
                        <input
                            type="color"
                            value={chartColor}
                            onChange={handleColorChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </Box>
                    <Box mb="20px">
                        <Typography variant="h6" color="white">Selecione a data inicial:</Typography>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => handleDateChange(date, 'start')}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Data inicial"
                        />
                    </Box>
                    <Box mb="20px">
                        <Typography variant="h6" color="white">Selecione a data final:</Typography>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => handleDateChange(date, 'end')}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Data final"
                        />
                    </Box>
                </Box>
            )}
            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 10,
                }}
            >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} color="white">
                    {isCollapsed ? '☰' : '×'}
                </IconButton>
            </Box>
        </Box>
    );
};

export default Sidebar;
