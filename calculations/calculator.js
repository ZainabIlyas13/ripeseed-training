function filterReadingsByYear(readings, year) {
    return readings.filter(r => r && r.date instanceof Date && !isNaN(r.date) && r.date.getFullYear() === year);
}

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
