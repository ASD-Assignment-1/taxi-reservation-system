import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IResponse } from 'src/app/interface/IResponse';
import { IUser } from 'src/app/interface/IUser';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { showError, showQuestion, showSuccess } from 'src/app/utility/helper';

@UntilDestroy()
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  protected searchTerm: string;
  protected displayedColumns: string[] = [
    'userId',
    'username',
    'name',
    'mobile',
    'email',
    'lastLogin',
    'lastLogout',
    'actions',
  ];

  protected users: IUser[] = [];
  protected selectUser: IUser;

  protected tripList: any[] = [];

  constructor(private dialog: MatDialog, private service: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomerData();
  }

  protected loadCustomerData() {
    this.service
      .getAllActiveUsers()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: IResponse) => {
          this.users = res.data;
        },
        error: () => {
          showError({
            title: 'System Error',
            text: 'Something Went Wrong',
          });
        },
      });
  }

  protected openUserDetails(user: IUser, dialogRef: TemplateRef<any>) {
    this.selectUser = user;
    this.service
      .getLast5ReservationById(user.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: IResponse) => {
          console.log(res);
          if (!res.data.length) {
            showError({
              title: 'Oops',
              text: 'Currently,There is no any completed reservation for this user',
            });
            return;
          }
          //need to implement
          this.tripList = res.data;
          this.dialog.open(dialogRef);
        },
        error: () => {
          showError({
            title: 'System Error',
            text: 'Something Went Wrong',
          });
        },
      });
  }

  protected deleteUser(userId: number) {
    showQuestion(
      {
        title: 'Delete',
        text: 'Are you really want to delete this user ?',
      },
      (isConfirmed) => {
        if(isConfirmed){
          this.service
          .deleteUser(userId)
          .pipe(untilDestroyed(this))
          .subscribe({
            next: (res: IResponse) => {
              showSuccess({
                title: 'Success',
                text: 'User Deleted Successfully',
              });
              this.loadCustomerData();
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
    );
  }

  protected search() {
    this.service
      .searchUser(this.searchTerm)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: IResponse) => {
          if (!res.data.length) {
            showError({
              title: 'Sorry, No Result Found',
              text: 'Adjust your filters and try again',
            });
            return;
          }
          this.users = res.data;
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
