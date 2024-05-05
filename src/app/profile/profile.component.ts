import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

}
