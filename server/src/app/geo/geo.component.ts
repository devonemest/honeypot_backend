import { Component, OnInit } from '@angular/core';
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {

  constructor(private data: DataService) { }
  status = '';
  mapLink = '';
  href = '';
  ngOnInit(): void {
    if (!navigator.geolocation) {
      this.status = 'Geolocation is not supported by your browser';
    } else {
      this.status = 'Locating…';
      navigator.geolocation.getCurrentPosition((position => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude

        this.data.addGeo([latitude, longitude]);

        this.status = '';
        this.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        this.mapLink = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      }));
  }

  }

}
