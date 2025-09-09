import fs from 'fs';
import path from 'path';
import WeatherFields from '../model/weatherFields.js';

export const weatherFileParser = (filePath) => {
    const fullPath = path.resolve(filePath);
    const data = fs.readFileSync(fullPath, 'utf-8');

    //split lines and trim whitespace
    const lines = data.trim().split('\n');

    if (lines.length < 2) {
        console.error('File contains no data rows.');
        return [];
    }

    //extract the headers row
    const header = lines[0].split(',').map(h => h.trim());
    const requiredFields = new Set([
        'PKT',
        'Max TemperatureC',
        'Mean TemperatureC',
        'Min TemperatureC',
        'Max Humidity',
        'Mean Humidity',
        'Min Humidity'
    ]);
    const weatherRecords = [];

    //gather all the data for each record
    lines.slice(1).forEach((line) => {
        const values = line.split(',');

        if (values.length !== header.length) {
            console.warn(`field count mismatch.`);
            return;
        }

        const row = {};
        header.forEach((key, j) => {
            if (requiredFields.has(key)) {
                const val = values[j];
                row[key] = (val ? val.trim() : '');
            }
        });

        const reading = new WeatherFields(row);
        //push the record to the weatherRecords array
        weatherRecords.push(reading);
    });

    return weatherRecords;
}

