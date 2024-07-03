import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'personal-investment-tracker';
  showLoader = false
  constructor(private auth: AuthService ){
    this.auth.loadingStart.subscribe((state:Array<object>)=> {
      console.log(state);
      if (state.length > 0) {
        this.showLoader = true
      } else {
        this.showLoader = false
      }
      
    })
  }
}
