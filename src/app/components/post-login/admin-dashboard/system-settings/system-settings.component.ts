import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent {
  isEditing = false;
  settingsForm: FormGroup;
  passwordForm: FormGroup;
  user = {
    profilePicture: '',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123456789',
  };


  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      name: [this.user.name],
      email: [this.user.email],
      phone: [this.user.phone],
      currentPassword: [''],
    });


    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
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





