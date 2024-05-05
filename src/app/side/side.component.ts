import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './side.component.html',
  styleUrl: './side.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideComponent {

}
