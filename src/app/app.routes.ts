import { Routes } from '@angular/router';
import {blockGuard} from "./core/auth/services/block.guard";

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [blockGuard],
    loadComponent: () =>
      import('./core/auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [blockGuard],
    loadComponent: () =>
      import('./core/auth/register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'my',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent)
  }
];
