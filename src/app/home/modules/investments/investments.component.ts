import { Component, effect } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [HeaderComponent, JsonPipe, CardModule, DropdownModule,FormsModule,KeyValuePipe],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent {
  investments:
  | { investments: Array<any>; mail: string; name: string }
  | any;

investmentToshow = {}
selectedYear = { name: '2024' };
investmentTypes = [
  { name: 'fd' },
  { name: 'mf' },
  { name: 'stocks' },
  { name: 'others' },
  { name: 'nps' },
 ]
years = [
  { name: '2019' },
  { name: '2020' },
  { name: '2021' },
  { name: '2022' },
  { name: '2023' },
  { name: '2024' },
  { name: '2025' },
  { name: '2026' },
]
constructor(public dataService: DataService) {
  effect(() => {
    this.investments = this.dataService.userData().investments
    if (this.investments && Object.keys(this.investments).length != 0) {
      this.investmentToshow = this.investments[this.selectedYear.name as keyof object]
    }
  });
}

yearChanged(){
  if (this.investments[this.selectedYear.name as keyof object] != undefined) {
    this.investmentToshow = this.investments[this.selectedYear.name as keyof object]
  }else{
    this.investmentToshow = {}
  }
  
}
}
