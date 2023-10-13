import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { BehaviorSubject, Observable, concat, of, toArray } from 'rxjs';

type Coords = {
  longitude: number,
  latitude: number
} | null

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  private coords: BehaviorSubject<Coords>;
  constructor(
    private weatherService: WeatherService,
  ) {
    this.coords = new BehaviorSubject<Coords>(null);
  }

  getLocation(): void {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.coords.next({longitude, latitude});
        });
    } else {
      console.log("No support for geolocation")
    }
  }

  ngOnInit(): void {
    this.getLocation();

    const stream = concat([this.coords])

    // if (coords) {
    //   console.log(coords);
    //   this.weatherService.getLocationKey(coords.longitude, coords.latitude)
    //     .subscribe((result) => {
    //       const locationKey = result.Key;
    //       this.weatherService.get24HourForecast(locationKey)
    //         .subscribe((result) => {
    //           console.log(result);
    //         });
    //     });
    //   }
  }
}
