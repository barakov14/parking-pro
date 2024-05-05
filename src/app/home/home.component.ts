import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {GoogleMapsComponent} from "../google-maps/google-maps.component";
import {MatButton} from "@angular/material/button";
import {HeaderComponent} from "../shared/header/header.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {ReserveComponent} from "../reserve/reserve.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ReserveRequest} from "../core/api-types/reserve";
import {ReserveService} from "../core/services/reserve.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GoogleMapsComponent,
    MatButton,
    HeaderComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly reserveService = inject(ReserveService)

  onReserve() {
    const dialogRef: MatDialogRef<ReserveComponent> =
      this.dialog.open(ReserveComponent, {
        hasBackdrop: true,
      })
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: ReserveRequest) => {
        this.reserveService.reservePayment().pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe()
      })
  }
}
