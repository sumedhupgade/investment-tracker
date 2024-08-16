import { ChangeDetectionStrategy, Component, OnInit, computed, effect, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DataService } from '../services/data.service';

@Component({
  selector: 'header',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [],
})
export class HeaderComponent implements OnInit {

  user:any = JSON.stringify(this.dataService.currentUser());

  items = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      },
    },
  ];
  constructor(public dataService: DataService, private authService:AuthService) {
    effect(() => {
      this.user =JSON.parse(JSON.stringify(this.dataService.userDetails()))?.displayName;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }
}
