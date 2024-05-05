import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core'
import {MatIcon} from '@angular/material/icon'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatDrawer} from '@angular/material/sidenav'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {MatMenuModule} from '@angular/material/menu'
import {MatListModule} from '@angular/material/list'
import {MatSlideToggle} from '@angular/material/slide-toggle'
import {MatLabel} from '@angular/material/form-field'
import {FormsModule} from '@angular/forms'
import {
  MatTreeModule,
} from '@angular/material/tree'
import {AsyncPipe, NgForOf, NgIf} from '@angular/common'

@Component({
  selector: 'ui-navbar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatListModule,
    RouterLink,
    MatSlideToggle,
    MatLabel,
    FormsModule,
    MatTreeModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  // @Input() projects!: Project[] | null | undefined
  @Input() start!: MatDrawer
  showDropdown: boolean = false

  toggleDropdown() {
    this.showDropdown = !this.showDropdown
  }
}
