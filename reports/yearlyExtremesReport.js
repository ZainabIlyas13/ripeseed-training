const dtMonth = new Intl.DateTimeFormat('en', { month: 'long' });
const dtDay = new Intl.DateTimeFormat('en', { day: '2-digit' });

export function yearlyExtremesReport(extremes) {
    if (!extremes) console.log( 'No data found for given year.');
    const { highestTemp, lowestTemp, mostHumid } = extremes;

    const lines = [];
    if (highestTemp?.date instanceof Date) {
        lines.push(`Highest: ${Math.round(highestTemp.value)}C on ${dtMonth.format(highestTemp.date)} ${dtDay.format(highestTemp.date)}`);
    }
    if (lowestTemp?.date instanceof Date) {
        lines.push(`Lowest: ${Math.round(lowestTemp.value)}C on ${dtMonth.format(lowestTemp.date)} ${dtDay.format(lowestTemp.date)}`);
    }
    if (mostHumid?.date instanceof Date) {
        lines.push(`Humidity: ${Math.round(mostHumid.value)}% on ${dtMonth.format(mostHumid.date)} ${dtDay.format(mostHumid.date)}`);
    }
    console.log(lines.join('\n'))
}



