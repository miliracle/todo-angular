import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetHourlyForecastParams, ResultGetHourlyForecast } from './weather';
@Injectable({
  providedIn: 'root',
})
export class WeatherService extends ApiService {
  constructor(override http: HttpClient) {
    super(http, environment.weatherApiUrl)
  }

  get24HourForecast(query: GetHourlyForecastParams): Observable<ResultGetHourlyForecast> {
    const hourly = []
    if(query.temperature_2m) {
      hourly.push('temperature_2m')
    }
    if(query.relativehumidity_2m) {
      hourly.push('relativehumidity_2m')
    }
    if(query.rain) {
      hourly.push('rain')
    }
    if(query.cloudcover) {
      hourly.push('cloudcover')
    }
    const params = new HttpParams({fromObject: {
      latitude: query.latitude,
      longitude: query.longitude,
      hourly: hourly.join(',')
    }})
    return this.get(`/forecast`, params);
  }
}
