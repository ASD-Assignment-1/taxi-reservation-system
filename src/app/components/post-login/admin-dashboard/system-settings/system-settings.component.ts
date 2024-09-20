import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { StorageService } from 'src/app/services/storage.service';

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

  constructor(private fb: FormBuilder, private storage: StorageService,private service:CustomerService) {
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
    const admin: any = this.storage.get('admin-data');

    this.settingsForm.patchValue({
      name: admin.name,
      email: admin.email,
      phone: admin.mobileNumber,
    });
  }

  onEditClick() {
    this.isEditing = true;
  }

  protected onSaveClick() {
    if (this.settingsForm.valid) {
      this.isEditing = false;
      console.log('Form Data:', this.settingsForm.value);
    }
  }

  protected onChangePasswordClick() {
    if (this.passwordForm.valid) {
    }
  }
}
