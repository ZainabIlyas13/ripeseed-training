class WeatherFields {
    constructor(data) {
        this.date = new Date(data["PKT"]);

        this.maxTemperature = parseFloat(data["Max TemperatureC"]) || null;
        this.meanTemperature = parseFloat(data["Mean TemperatureC"]) || null;
        this.minTemperature = parseFloat(data["Min TemperatureC"]) || null;

        this.maxDewPoint = parseFloat(data["Dew PointC"]) || null;
        this.meanDewPoint = parseFloat(data["MeanDew PointC"]) || null;
        this.minDewPoint = parseFloat(data["Min DewpointC"]) || null;

        this.maxHumidity = parseFloat(data["Max Humidity"]) || null;
        this.meanHumidity = parseFloat(data["Mean Humidity"]) || null;
        this.minHumidity = parseFloat(data["Min Humidity"]) || null;

        this.maxSeaLevelPressure = parseFloat(data["Max Sea Level PressurehPa"]) || null;
        this.meanSeaLevelPressure = parseFloat(data["Mean Sea Level PressurehPa"]) || null;
        this.minSeaLevelPressure = parseFloat(data["Min Sea Level PressurehPa"]) || null;

        this.maxVisibility = parseFloat(data["Max VisibilityKm"]) || null;
        this.meanVisibility = parseFloat(data["Mean VisibilityKm"]) || null;
        this.minVisibility = parseFloat(data["Min VisibilitykM"]) || null;

        this.maxWindSpeed = parseFloat(data["Max Wind SpeedKm/h"]) || null;
        this.meanWindSpeed = parseFloat(data["Mean Wind SpeedKm/h"]) || null;
        this.maxGustSpeed = parseFloat(data["Max Gust SpeedKm/h"]) || null;

        this.precipitation = parseFloat(data["Precipitationmm"]) || 0; 

        this.cloudCover = parseFloat(data["CloudCover"]) || null;
        this.events = data["Events"]?.trim() || null;
        this.windDirectionDegrees = parseFloat(data["WindDirDegrees"]) || null;
    }
}

export default WeatherFields;
