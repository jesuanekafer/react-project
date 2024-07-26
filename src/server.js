const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const app = express();
const port = 8000;

const csvFilePath = path.join(__dirname, 'CTE.csv');

app.get('/columns', (req, res) => {
    const columns = [];
    
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('headers', (headerList) => {
            headerList.forEach((header) => columns.push(header));
        })
        .on('end', () => {
            res.json({ columns });
        })
        .on('error', (err) => {
            res.status(500).json({ error: err.message });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
