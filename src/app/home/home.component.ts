import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GoogleMapsComponent} from "../google-maps/google-maps.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GoogleMapsComponent,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
