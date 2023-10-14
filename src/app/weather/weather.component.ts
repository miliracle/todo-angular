import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { Weather } from './weather';

type Coordinates = {
  longitude: number,
  latitude: number
} | null

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weathers: Array<Weather> = [];
  constructor(
    private weatherService: WeatherService,
  ) {}

  getUserCoordinates(): Observable<Coordinates> {
    return new Observable<Coordinates>(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position.coords);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  getUserWeatherForecast() {
    this.getUserCoordinates()
      .pipe(
        switchMap(coords => {
          if(coords) {
            return this.weatherService.get24HourForecast({
              latitude: coords.latitude,
              longitude: coords.longitude,
              temperature_2m: true,
              relativehumidity_2m: true,
              rain: true,
              cloudcover: true
            })
          }
          return of(null)
        }),
        catchError(error => {
          console.error('Error fetching weather data:', error);
          return throwError(error);
        })
      )
      .subscribe(weatherData => {
        if(weatherData) {
          this.weathers = weatherData.hourly.time.map((time, index) => {
            return {
              atHour: new Date(time).toLocaleTimeString(),
              weatherType: weatherData.hourly.rain[index] > 0 ? 'rain' : weatherData.hourly.cloudcover[index] > 50 ? 'cloudy' : 'sunny',
              temperature: weatherData.hourly.temperature_2m[index],
              humidity: weatherData.hourly.relativehumidity_2m[index],
              cloudcover: weatherData.hourly.cloudcover[index]
            }
          });
        }
      });
  }

  ngOnInit(): void {
    this.getUserWeatherForecast();
  }
}

