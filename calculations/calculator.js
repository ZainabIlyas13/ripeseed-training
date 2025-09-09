function filterReadingsByYear(readings, year) {
    return readings.filter(r => r && r.date instanceof Date && !isNaN(r.date) && r.date.getFullYear() === year);
}

function filterReadingsByYearMonth(readings, year, month) {
    return readings.filter(r => r.date instanceof Date && !isNaN(r.date)
        && r.date.getFullYear() === year && (r.date.getMonth() + 1) === month);
}

const calculateAverage = (nums) => {
    return nums.length ? nums.reduce((s, n) => s + n, 0) / nums.length : null;
};

export function calculateYearlyExtremes(readings, year) {
    const yearReadings = filterReadingsByYear(readings, year);
    if (yearReadings.length === 0) return null;

    let highestTemp, lowestTemp, mostHumid;

    for (const r of yearReadings) {
        if (Number.isFinite(r.maxTemperature)) {
            if (!highestTemp || r.maxTemperature > highestTemp.value) {
                highestTemp = { value: r.maxTemperature, date: r.date };
            }
        }
        if (Number.isFinite(r.minTemperature)) {
            if (!lowestTemp || r.minTemperature < lowestTemp.value) {
                lowestTemp = { value: r.minTemperature, date: r.date };
            }
        }
        if (Number.isFinite(r.maxHumidity)) {
            if (!mostHumid || r.maxHumidity > mostHumid.value) {
                mostHumid = { value: r.maxHumidity, date: r.date };
            }
        }
    }

    return { highestTemp, lowestTemp, mostHumid };
}

export function calculateMonthlyAverages(readings, year, month) {
    const monthReadings = filterReadingsByYearMonth(readings, year, month);
    if (monthReadings.length === 0) return null;

    const highTemperatures = monthReadings.map(r => r.maxTemperature);
    const lowTemperatures = monthReadings.map(r => r.minTemperature);
    const meanHumidities = monthReadings.map(r => r.meanHumidity);

    return {
        highestAverage: calculateAverage(highTemperatures),
        lowestAverage: calculateAverage(lowTemperatures),
        averageMeanHumidity: calculateAverage(meanHumidities)
    };
}


