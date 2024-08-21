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
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.minLength(8)]),
  });
  passwordVisible = false;
  passwordError = { state: false, msg: '' };
  _that = this;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  signUp() {
    const cred = {
      email: this.signupForm.value.email || '',
      user_name: this.signupForm.value.name || '',
      password: this.signupForm.value.password || '',
    };
    if (this.signupForm.status != 'INVALID') {
      const resp = this.authService
        .SignUpWithIdPassword(cred).then((resp) => {
          console.log(resp);
        }).catch(error => {
          console.log(error);
          this.passwordError = { state: true, msg: "Email already in use" };
        })
        
    }
  }

  get signupFormControl() {
    return this.signupForm.controls;
  }

}
