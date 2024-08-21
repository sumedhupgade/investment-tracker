import { ChangeDetectionStrategy, Component, OnInit, computed, effect, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [],
})
export class HeaderComponent implements OnInit {

  user = 'https://ui-avatars.com/api/?name=User&rounded=true';

  items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/profile']);
      },
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      },
    },
  ];
  constructor(public dataService: DataService, private authService:AuthService, private router : Router) {
    effect(() => {
      this.user =this.dataService.userData().user_info.img;    
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }
}
