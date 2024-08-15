import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InvestmentsComponent } from './home/modules/investments/investments.component';
import { MonthlyExpenseComponent } from './home/modules/monthly-expense/monthly-expense.component';
import { TodoComponent } from './home/modules/todo/todo.component';
import { AuthguardService } from './services/authguard.service';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthguardService] },
  { path: 'todo', component: TodoComponent, canActivate: [AuthguardService] },
  {
    path: 'investments',
    component: InvestmentsComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'monthly-expense',
    component: MonthlyExpenseComponent,
    canActivate: [AuthguardService],
  },
];
