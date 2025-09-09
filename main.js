import fs from 'fs';
import path from 'path';

import { weatherFileParser } from './parser/weatherFileParser.js';
import { calculateYearlyExtremes, calculateMonthlyAverages, listMonthlyReadings } from './calculations/calculator.js';
import { yearlyExtremesReport } from './reports/yearlyExtremesReport.js';
import { monthlyAveragesReport } from './reports/monthlyAveragesReport.js';
import { monthlyChartReport } from './reports/monthlyChartReport.js';

const parseAllReadingsFromDataFolder = (dataDir) => {
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

const main = () => {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        return;
    }

    const dataDir = args[0];
    const weatherReadings = parseAllReadingsFromDataFolder(dataDir);
    if (weatherReadings.length === 0) {
        console.log('No valid readings found in data folder.');
        return;
    }

    //manage multiple reports
    args.slice(1)
        .reduce((pairs, curr, idx, arr) => {
            if (idx % 2 === 0) pairs.push([curr, arr[idx + 1]]);
            return pairs;
        }, [])
        .forEach(([flag, value]) => {
            if (!flag || !value) {
                console.log('Wrong format for arguments');
                return;
            }
            if (flag === '-e') { // yearly extremes
                const year = parseInt(value, 10);
                const extremes = calculateYearlyExtremes(weatherReadings, year);
                //print the report
                yearlyExtremesReport(extremes);
            } else if (flag === '-a') { // monthly averages
                const [yearStr, monthStr] = value.split('/');
                const year = parseInt(yearStr, 10);
                const month = parseInt(monthStr, 10);
                const averages = calculateMonthlyAverages(weatherReadings, year, month);
                monthlyAveragesReport(averages);
            } else if (flag === '-c') { // monthly chart
                const [yearStr, monthStr] = value.split('/');
                const year = parseInt(yearStr, 10);
                const month = parseInt(monthStr, 10);
                const monthReadings = listMonthlyReadings(weatherReadings, year, month);
                monthlyChartReport(monthReadings, year, month);
            } else {
                console.log('Unknown flag');
            }
        });
}

main();
