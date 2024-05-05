import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../core/auth/services/auth.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton,
    RouterLink,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly destroyRef = inject(DestroyRef)

  public currentUser = this.authService.currentUser

  ngOnInit() {
    this.authService.getCurrentUser().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }
}
