import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DriverService } from 'src/app/services/driver/driver.service';
import { StorageService } from 'src/app/services/storage.service';

@UntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  protected settingsForm: FormGroup;
  protected passwordForm: FormGroup;
  protected isEditing = false;
  protected isAvailable = true;

  constructor(private fb: FormBuilder, private storage: StorageService,private service:DriverService) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      licenseNumber: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const driver: any = this.storage.get('driver-data');

    this.settingsForm.patchValue({
      name: driver.name,
      email: driver.email,
      phone: driver.mobileNumber,
      licenseNumber: driver.licenseNumber,
    });
  }

  protected onEditClick() {
    this.isEditing = true;
  }

  protected onSaveClick() {
    this.isEditing = false;
  }

  protected onChangePasswordClick() {
    // Change password logic here
  }

  protected onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
    }
  }

  protected onStatusChange(event: any) {
    this.isAvailable = event.checked;
    // Handle status change logic here
  }
}
