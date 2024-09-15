import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ILocation } from 'src/app/interface/ILocation';
import { ILogin } from 'src/app/interface/ILogin';
import { IResponse } from 'src/app/interface/IResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
import { showError } from 'src/app/utility/helper';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  protected loginForm: FormGroup;
  protected location: ILocation;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      role: ['User', Validators.required],
    });
  }

  ngOnInit(): void {
    this.service
      .getLocation()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          this.location = res;
        },
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { role, username, password } = this.loginForm.value;
      const loginRequest: ILogin = {
        userName: username,
        password: password,
        longitude: this.location.lng,
        latitude: this.location.lat,
      };
      if (role === 'User') {
        this.service
          .userLogin(loginRequest)
          .pipe(untilDestroyed(this))
          .subscribe({
            next: (res: IResponse) => {
              console.log(res);
              this.router.navigate(['post-login/customer-dashboard']);
            },
            error: (err: HttpErrorResponse) => {
              showError({
                title: 'System Error',
                text: 'Something Went Wrong',
              });
            },
          });
      } else {
        this.service
          .driverLogin(loginRequest)
          .pipe(untilDestroyed(this))
          .subscribe({
            next: (res: IResponse) => {
              console.log(res);
              this.router.navigate(['post-login/customer-dashboard']);
            },
            error: (err: HttpErrorResponse) => {
              showError({
                title: 'System Error',
                text: 'Something Went Wrong',
              });
            },
          });
      }
    }
  }
}
