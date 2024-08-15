import { Component } from '@angular/core';
import { Event, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs/operators';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressSpinnerModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'personal-investment-tracker';
  showLoader = false;
  loggedIn = false;
  constructor(private auth: AuthService, public router: Router, private ds: DataService) {
    
      this.loggedIn = this.auth.isLoggedIn()

    this.ds.loadingStart.subscribe((state: Array<object>) => {
      if (state.length > 0) {
        this.showLoader = true;
      } else {
        this.showLoader = false;
      }
    });

    router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent
        )
      )
      .subscribe((e: RouterEvent) => {
        // Do something
        if (e.url != '') {
          this.loggedIn = this.auth.isLoggedIn()
        }
      });
  }
}
