import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeopositionSearchResult } from './weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService extends ApiService {
  constructor(override http: HttpClient) {
    super(http, environment.weatherApiUrl)
  }

  getLocationKey(longitude: number, latitude: number): Observable<GeopositionSearchResult> {
    const params = new HttpParams()
    params.set('apikey', environment.weatherApiKey)
    params.set('q', `${latitude},${longitude}`)
    return this.get(`cities/geoposition/search`, params);
  }

  get24HourForecast(locationKey: string): Observable<any> {
    const params = new HttpParams()
    params.set('apikey', environment.weatherApiKey)
    return this.get(`forecasts/v1/hourly/24hour/${locationKey}`, params);
  }
}
