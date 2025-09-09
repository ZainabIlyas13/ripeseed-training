import fs from 'fs';
import path from 'path';

import { weatherFileParser } from './parser/weatherFileParser.js';
import { calculateYearlyExtremes } from './calculations/calculator.js';
import { yearlyExtremesReport } from './reports/yearlyExtremesReport.js';

function parseAllReadingsFromDataFolder(dataDir) {
    const weatherReadings = [];

    const files = fs.readdirSync(dataDir);

    //loop through each file
    files.forEach((file) => {
        const fullPath = path.join(dataDir, file);

        if (fs.statSync(fullPath).isFile() && (file.endsWith('.txt') || file.endsWith('.csv'))) {
            const readings = weatherFileParser(fullPath);
            weatherReadings.push(...readings);
        }
    });

    return weatherReadings;
}

function main() {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        return;
    }

    const dataDir = args[0];
    const flag = args[1];
    const value = args[2];

    const weatherReadings = parseAllReadingsFromDataFolder(dataDir);
    if (weatherReadings.length === 0) {
        console.log('No valid readings found in data folder.');
        return;
    }

    //flag conditions for each report type
    if (flag === '-e') { //yearly extremes
        const year = parseInt(value, 10);
        const extremes = calculateYearlyExtremes(weatherReadings, year);
        //print the report
        yearlyExtremesReport(extremes);
    } else {
        console.log('Unknown flag');
    }

}

main();
