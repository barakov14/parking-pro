import {inject, Injectable} from '@angular/core'
import {LocalStorageJwtService} from './local-storage-jwt.service'
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../api-types/auth'
import {ApiService} from '../../http/api.service'
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs'
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar'
import {CurrentUser} from "../../api-types/user";
import {tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly localStorageJwtService = inject(LocalStorageJwtService)
  private readonly apiService = inject(ApiService)
  private readonly router = inject(Router)
  private readonly _snackbar = inject(MatSnackBar)

  public currentUser = new BehaviorSubject<CurrentUser | null>(null)

  public login(data: LoginRequest): Observable<void> {
    return this.apiService
      .post<AuthResponse, LoginRequest>('/login', data)
      .pipe(
        map((res: AuthResponse) => {
          this.router.navigateByUrl('/dashboard')
          this.localStorageJwtService.setItem(res.token)
          this._snackbar.open('Authenticated successfully', 'OK')
        }),
        catchError((errors) => {
          // Вывод ошибки в консоль для отладки
          return of(/*this.errors$.next(errors.error)*/) // Отправка ошибки через BehaviorSubject
        }),
      )
  }

  public register(data: RegisterRequest): Observable<AuthResponse | void> {
    return this.apiService
      .post<AuthResponse, RegisterRequest>('/login', data)
      .pipe(
        tap((res) => {
          this.router.navigateByUrl('/dashboard')
          this.localStorageJwtService.setItem(res.token)
        }),
        catchError(() => of(console.log('Backend errors here'))),
      )
  }
  public logout(): void {
    this.localStorageJwtService.removeItem()
  }

  public getCurrentUser(): Observable<CurrentUser> {
    return this.apiService.get<CurrentUser>('/api/auth/info').pipe(
      tap((res) => {
        this.currentUser.next(res)
      }),
      catchError((error) => of())
    )
  }
}
