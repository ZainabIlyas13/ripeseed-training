class WeatherFields {
    constructor(data) {
        this.date = new Date(data["PKT"]);

        this.maxTemperature = parseFloat(data["Max TemperatureC"]) || null;
        this.meanTemperature = parseFloat(data["Mean TemperatureC"]) || null;
        this.minTemperature = parseFloat(data["Min TemperatureC"]) || null;

        this.maxHumidity = parseFloat(data["Max Humidity"]) || null;
        this.meanHumidity = parseFloat(data["Mean Humidity"]) || null;
        this.minHumidity = parseFloat(data["Min Humidity"]) || null;
    }
}

export default WeatherFields;
