import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IResponse } from 'src/app/interface/IResponse';
import { IUser } from 'src/app/interface/IUser';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { StorageService } from 'src/app/services/storage.service';
import { showError, showSuccess } from 'src/app/utility/helper';

@UntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  protected isEditing = false;
  protected settingsForm: FormGroup;
  protected passwordForm: FormGroup;

  protected user: IUser;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private service: CustomerService
  ) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.storage.get('user-data') as unknown as IUser;

    this.settingsForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.mobileNumber,
    });
  }

  onEditClick() {
    this.isEditing = true;
  }

  onSaveClick() {
    if (this.settingsForm.valid) {
      this.service
        .updateCustomer(this.user.id, this.settingsForm.value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res: IResponse) => {
            showSuccess({
              title: 'Success',
              text: 'Your details updated successfully',
            });
            this.isEditing = false;
            this.user = { ...this.user, ...this.settingsForm.value };
            this.storage.set('user-data', this.user);
          },
          error: () => {
            showError({
              title: 'System Error',
              text: 'Something Went Wrong',
            });
          },
        });
    }
  }

  onChangePasswordClick() {
    if (this.passwordForm.valid) {
      // Password change logic here
    }
  }
}
