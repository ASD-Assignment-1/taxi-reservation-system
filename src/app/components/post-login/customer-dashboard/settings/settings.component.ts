import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isEditing = false;
  settingsForm: FormGroup;
  passwordForm: FormGroup;
  constructor(private fb: FormBuilder, private storage: StorageService) {
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
    const user: any = this.storage.get('user-data');

    this.settingsForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.mobileNumber,
    });
  }

  onEditClick() {
    this.isEditing = true;
  }

  onSaveClick() {
    if (this.settingsForm.valid) {
      this.isEditing = false;
      console.log('Form Data:', this.settingsForm.value);
    }
  }

  onChangePasswordClick() {
    if (this.passwordForm.valid) {
      // Password change logic here
    }
  }
}
