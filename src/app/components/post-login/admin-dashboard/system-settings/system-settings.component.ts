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
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss'],
})
export class SystemSettingsComponent implements OnInit {
  protected isEditing = false;
  protected settingsForm: FormGroup;
  protected passwordForm: FormGroup;

  protected admin: IUser;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private service: CustomerService
  ) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.admin = this.storage.get('admin-data') as unknown as IUser;

    this.settingsForm.patchValue({
      name: this.admin.name,
      email: this.admin.email,
      mobileNumber: this.admin.mobileNumber,
    });
  }

  onEditClick() {
    this.isEditing = true;
  }

  protected onSaveClick() {
    if (this.settingsForm.valid) {
      this.service
        .updateCustomer(this.admin.id, this.settingsForm.value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res: IResponse) => {
            showSuccess({
              title: 'Success',
              text: 'Your details updated successfully',
            });
            this.isEditing = false;
            this.admin = { ...this.admin, ...this.settingsForm.value };
            this.storage.set('admin-data',this.admin);
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

  protected onChangePasswordClick() {
    if (this.passwordForm.valid) {
    }
  }
}
