import { Component, effect } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  investments:{investments: Array<any>, mail: string, name: string} | undefined;
  constructor(private authService: AuthService){
    effect(() => {
      this.investments = this.authService.userData()
    })
  }
  logout(){
    this.authService.signOut()
  }

}
