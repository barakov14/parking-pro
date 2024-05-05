import {Component, DestroyRef, inject} from '@angular/core';
import {MatInput} from "@angular/material/input";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthService} from "../services/auth.service";
import {LoginRequest, RegisterRequest} from "../../api-types/auth";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs/operators";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
      MatCardModule,
      MatFormFieldModule,
      MatButtonModule,
      MatInput,
      RouterLink,
      ReactiveFormsModule,
      NgIf,
      AsyncPipe,
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService)
  private readonly destroy$ = inject(DestroyRef)

  // public error$ = this.authService.errors$

  validationErrors = ''

  isSubmitting: boolean = false

  public formGroup = new FormBuilder().group({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })

  onRegister() {
    this.isSubmitting = true
    if (this.formGroup.valid) {
      const data: RegisterRequest = {
        email: this.formGroup.value.email as string,
        username: this.formGroup.value.username as string,
        password: this.formGroup.value.password as string,
      }

      this.validationErrors = ''

      this.authService
        .register(data)
        .pipe(
          takeUntilDestroyed(this.destroy$),
          tap(() => this.isSubmitting = false),
          catchError(() => {
            return of(this.isSubmitting = false)
          })
        )
        .subscribe()
    } else {
      this.validationErrors = 'Invalid username or password.'
      this.isSubmitting = false
    }
  }
}
