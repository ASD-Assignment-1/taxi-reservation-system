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

  protected driver:any;

  protected imageURL:string='assets/images/empty-user.jpg';

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
    this.driver = this.storage.get('driver-data');

    this.settingsForm.patchValue({
      name: this.driver.name,
      email: this.driver.email,
      phone: this.driver.mobileNumber,
      licenseNumber: this.driver.licenseNumber,
    });

    this.imageURL = this.driver.profileImage;
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
      const reader = new FileReader();
  
        reader.onload = () => {
          const base64String = reader.result as string;
          console.log(base64String); 
          this.imageURL = base64String; 
        };
  
        reader.onerror = (error) => {
          console.error('Error converting file to base64', error);
        };
  
        reader.readAsDataURL(file);
    }
  }

  protected onStatusChange(event: any) {
    this.isAvailable = event.checked;
    // Handle status change logic here
  }

  onCancelClick() {
    this.isEditing=false;
    this.imageURL = this.driver.profileImage;
  }
}
