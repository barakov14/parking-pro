import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReserveComponent {
  public dialogRef = inject(MatDialogRef<ReserveComponent>)

  onSubmit() {
    this.dialogRef.close()
  }
}
