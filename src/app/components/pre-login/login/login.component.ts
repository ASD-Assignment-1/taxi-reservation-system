import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      role: ['customer', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { role } = this.loginForm.value;
      // Perform login based on the selected role
      if (role === 'customer') {
        this.router.navigate(['/customer-dashboard']);
      } else {
        this.router.navigate(['/driver-dashboard']);
      }
    }
  }
}
