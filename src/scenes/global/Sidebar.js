    import React, { useState } from 'react';
    import { Box, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import { tokens } from "../../theme";
    //import BasicChart from './graficos/BasicChart'; 
    import './sidebar.css';
    //import logo from "./assets/LOGO.png"; // Verifique se o caminho está correto

    const Sidebar = ({ setFilters, setSelectedCharts }) => {
    const colors = tokens("dark"); 
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [charts, setCharts] = useState({
        opcao1: false,
        opcao2: false,
        opcao3: false,
    });
    const [chartType, setChartType] = useState('bar');

    const handleDateChange = (date, type) => {
        if (type === 'start') {
        setStartDate(date);
        } else {
        setEndDate(date);
        }
        setFilters({ startDate: date, endDate: endDate });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCharts((prevCharts) => ({ ...prevCharts, [name]: checked }));
        setSelectedCharts({ ...charts, [name]: checked });
    };

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
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
            {/* <img src={logo} alt="Logo" style={{ width: isCollapsed ? 40 : 175, transition: 'width 0.3s' }} /> */}
        </Box>
        {!isCollapsed && (
            <Box>
            <Box mb="20px">
                <Typography variant="h6" color="white">Selecione a data inicial:</Typography>
                <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, 'start')}
                dateFormat="dd/MM/yyyy"
                />
            </Box>
            <Box mb="20px">
                <Typography variant="h6" color="white">Selecione a data final:</Typography>
                <DatePicker
                selected={endDate}
                onChange={(date) => handleDateChange(date, 'end')}
                dateFormat="dd/MM/yyyy"
                />
            </Box>
            <Box mb="20px" color="white">
                <label>
                <input
                    type="checkbox"
                    name="opcao1"
                    checked={charts.opcao1}
                    onChange={handleCheckboxChange}
                />
                Média de autorização nota MDFe
                </label>
                {charts.opcao1 && (
                <Box mt="10px">
                    <FormControl fullWidth variant="filled">
                    <InputLabel id="chart-type-label">Tipo de Gráfico</InputLabel>
                    <Select
                        labelId="chart-type-label"
                        id="chart-type"
                        value={chartType}
                        onChange={handleChartTypeChange}
                    >
                        <MenuItem value="bar">Bar Chart</MenuItem>
                        <MenuItem value="line">Line Chart</MenuItem>
                        <MenuItem value="pie">Pie Chart</MenuItem>
                    </Select>
                    </FormControl>
                    <Box mt="20px">
                    {/*<BasicChart data={{ labels: ['Jan', 'Feb'], values: [10, 20] }} options={{}} /> */}
                    </Box>
                </Box>
                )}
            </Box>
            
            <Box mb="20px" color="white">
                <label>
                <input
                    type="checkbox"
                    name="opcao2"
                    checked={charts.opcao2}
                    onChange={handleCheckboxChange}
                />
                Outliers de MDFe
                </label>
            </Box>
            <Box mb="20px" color="white">
                <label>
                <input
                    type="checkbox"
                    name="opcao3"
                    checked={charts.opcao3}
                    onChange={handleCheckboxChange}
                />
                Ver estados que mais enviam e que mais recebem
                </label>
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
