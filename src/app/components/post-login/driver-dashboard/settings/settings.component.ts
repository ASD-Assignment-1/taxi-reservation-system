import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  settingsForm: FormGroup;
  passwordForm: FormGroup;
  isEditing = false;
  isAvailable = true; // Default status

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      licenseNumber: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onEditClick() {
    this.isEditing = true;
  }

  onSaveClick() {
    // Save logic here
    this.isEditing = false;
  }

  onChangePasswordClick() {
    // Change password logic here
  }

  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      
    }
  }

  onStatusChange(event: any) {
    this.isAvailable = event.checked;
    // Handle status change logic here
  }
}
