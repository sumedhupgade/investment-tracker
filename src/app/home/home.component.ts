import { Component, effect } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { JsonPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, JsonPipe, CardModule, DropdownModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  investments:
    | { investments: Array<any>; mail: string; name: string }
    | any;

  investmentToshow = {}
  selectedYear = { name: '2024' };
  years = [
    { name: '2019' },
    { name: '2020' },
    { name: '2021' },
    { name: '2022' },
    { name: '2023' },
    { name: '2024' },
    { name: '2025' },
    { name: '2026' },
  ];
  constructor(private authService: AuthService) {
    effect(() => {
      this.investments = this.authService.userData()
      console.log(this.investments);
      
      if (Object.keys(this.investments).length != 0) {
        this.investmentToshow = this.investments.investments[this.selectedYear.name as keyof object]
        console.log(this.investmentToshow);
      }
    });
  }

  yearChanged(){
    console.log(this.selectedYear);
    if (this.investments?.investments[this.selectedYear.name as keyof object] != undefined) {
      this.investmentToshow = this.investments?.investments[this.selectedYear.name as keyof object]
    }else{
      this.investmentToshow = {}
    }
    
  }
  logout() {
    this.authService.signOut();
  }
}
