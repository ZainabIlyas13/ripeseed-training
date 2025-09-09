import fs from 'fs';
import path from 'path';
import WeatherFields from '../model/weatherFields.js';

export function weatherFileParser(filePath) {
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
    const weatherRecords = [];

    //gather all the data for each record
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');

        if (values.length !== header.length) {
            console.warn(`field count mismatch.`);
            continue;
        }

        const row = {};
        for (let j = 0; j < header.length; j++) {
            row[header[j]] = values[j]?.trim() || '';
        }

        const reading = new WeatherFields(row);
        //push the record to the weatherRecords array
        weatherRecords.push(reading);
    }

    return weatherRecords;
}

