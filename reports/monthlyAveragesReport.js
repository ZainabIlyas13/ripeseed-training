export function monthlyAveragesReport(averages) {
    if (!averages) {console.log('No data found for given month.'); return;}

    const { highestAverage, lowestAverage, averageMeanHumidity } = averages;
    const lines = [];
    if (typeof highestAverage === 'number') {
        lines.push(`Highest Average: ${Math.round(highestAverage)}C`);
    }
    if (typeof lowestAverage === 'number') {
        lines.push(`Lowest Average: ${Math.round(lowestAverage)}C`);
    }
    if (typeof averageMeanHumidity === 'number') {
        lines.push(`Average Mean Humidity: ${Math.round(averageMeanHumidity)}%`);
    }
    console.log(lines.join('\n'))
}
