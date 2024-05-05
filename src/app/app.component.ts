import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {HeaderComponent} from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeaderComponent, MatDrawerContainer, MatDrawer, MatDrawerContent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hackathon';
}
