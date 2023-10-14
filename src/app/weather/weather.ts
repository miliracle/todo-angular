type GetHourlyForecastParams = {
  latitude: number,
  longitude: number,
  temperature_2m: boolean,
  relativehumidity_2m: boolean,
  rain: boolean,
  cloudcover: boolean,
}

type ResultGetHourlyForecast =   {
  latitude: number,
  longitude: number,
  generationtime_ms: number,
  utc_offset_seconds: number,
  timezone: string,
  elevation: number,
  hourly_units: {
      time: "iso8601",
      temperature_2m: "°C",
      relativehumidity_2m: "%",
      rain: "mm",
      cloudcover: "%"
  },
  hourly: {
    time: Array<string>,
    temperature_2m: Array<number>,
    relativehumidity_2m: Array<number>,
    rain: Array<number>,
    cloudcover: Array<number>
  }
}

type WeatherType = "rain" | "cloudy" | "sunny"

type Weather = {
  atHour: string
  weatherType: WeatherType
  temperature: number
  humidity: number
  cloudcover: number
}

export {
  GetHourlyForecastParams,
  ResultGetHourlyForecast,
  WeatherType,
  Weather
}
