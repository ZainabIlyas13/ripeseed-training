const fs = require('fs');
const path = require('path');

const { weatherFileParser } = require('./parser/weatherFileParser');

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

   console.log(weatherReadings);
}

main();
