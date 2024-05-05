import {AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, GoogleMapsModule, MapPolygon} from '@angular/google-maps';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [
    GoogleMapsModule,
    NgForOf,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss',
})
export class GoogleMapsComponent implements AfterViewInit {
  @ViewChild('map') mapElement!: GoogleMap;

  polygonPaths = new BehaviorSubject<google.maps.LatLngLiteral[]>([
    /*{ lat: 55.441489, lng: 55.99811 },
    { lat: 55.441489, lng: 87.99811 },
    { lat: 42.997054, lng: 87.99811 },
    { lat: 42.997054, lng: 55.99811 },*/
  ]);
  drawingEnabled = true;
  polygons: google.maps.PolygonOptions[] = [];

  map!: google.maps.Map;


  ngAfterViewInit() {
    if (this.mapElement && this.mapElement.googleMap) {
      this.map = this.mapElement.googleMap;

      this.getUserLocation()

      this.map.addListener('click', (event: any) => {
        this.onMapClick(event);
      });
    }
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // this.map.setCenter(userLocation);
          console.log(userLocation);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }


  onMapClick(event: any) {
    if (this.drawingEnabled) {
      const polygonPath = [...this.polygonPaths.value];
      polygonPath.push(event.latLng!.toJSON());
      this.polygonPaths.next(polygonPath);
      console.log(polygonPath)
      this.updatePolygons(polygonPath);
    }
  }

  toggleDrawing() {
    this.drawingEnabled = !this.drawingEnabled;
  }

  clearPolygon() {
    this.polygonPaths.next([]);
    this.updatePolygons([]);
  }

  updatePolygons(polygonPath: google.maps.LatLngLiteral[]) {
    const newPolygons: google.maps.PolygonOptions[] = [
      {
        paths: polygonPath,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }
    ];

    this.polygons = newPolygons;
  }
}
