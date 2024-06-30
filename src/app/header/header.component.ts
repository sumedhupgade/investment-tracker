import { ChangeDetectionStrategy, Component, OnInit, computed, effect, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'header',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [],
})
export class HeaderComponent implements OnInit {

  user:any = JSON.stringify(this.authService.currentUser());

  items = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      },
    },
  ];
  constructor(public authService: AuthService) {
    effect(() => {
      this.user =JSON.parse(JSON.stringify(this.authService.userDetails())).email;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }
}
