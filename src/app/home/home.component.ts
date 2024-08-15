import { Component, effect } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { JsonPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, JsonPipe, CardModule, DropdownModule,FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  
}
