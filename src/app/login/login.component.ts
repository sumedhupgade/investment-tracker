import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    DropdownModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  passwordError = { state: false, msg: '' };

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }
  login() {
    const cred = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };
    if (this.loginForm.status != 'INVALID') {
      const resp = this.authService
        .loginWithIdPassword(cred)
        .then((resp) => {
          this.dataService.setLoggedInUserData();
        })
        .catch((error) => {
          this.passwordError.state = true;
          if (error.message == 'Firebase: Error (auth/wrong-password).') {
            this.passwordError.msg = 'Incorrect Password';
          } else {
            this.passwordError.msg = 'Something went wrong';
          }
        });
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle()
  }
}
