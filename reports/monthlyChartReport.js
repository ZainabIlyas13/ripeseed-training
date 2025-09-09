//ANSI escape codes for text color
const RED = '\u001b[31m';
const BLUE = '\u001b[34m';
const RESET = '\u001b[0m';

function bar(len, color) {
    return color + '+'.repeat(Math.max(0, Math.round(len))) + RESET;
}

const dtMonth = new Intl.DateTimeFormat('en', { month: 'long' });

export function monthlyChartReport(readings, year, month) {
    if (!readings || readings.length === 0) return console.log('No data found for given month.');

    const monthName = dtMonth.format(new Date(year, month - 1, 1));
    //display month year
    console.log(`${monthName} ${year}`);

    readings.sort((a, b) => a.date - b.date).forEach(r => {
        const dayDate = r.date.getDate()
        //display max and min temperatures of each day
        if (r.maxTemperature) {
            console.log(`${dayDate} ${bar(r.maxTemperature, RED)} ${Math.round(r.maxTemperature)}C`);
        }
        if (r.minTemperature) {
            console.log(`${dayDate} ${bar(r.minTemperature, BLUE)} ${Math.round(r.minTemperature)}C`);
        }
    });
}
