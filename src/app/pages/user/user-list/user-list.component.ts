import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  public userList: UserModel[] = [];
  public userListApi: any = [];

  constructor(
    private location: Location,
    protected userService: UserService,
    private notification: NzNotificationService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getUsersList();
    this.cd.detectChanges();
  }

  getUsersList() {
    const subscription = this.userService.getAllUsers().subscribe(
      response => {
        if (response.length) {
          this.userList = response;
        } else {
          this.userList = [];
        }
      },
      error => {
        this.notification.error('Oops!', error);
      }
    )
    this.cd.detectChanges();
    this.subscriptions.push(subscription);
  }

  public delete(id: any, user: string) {
    const subscription = this.userService.delete(id).subscribe(
      () => {
        this.notification.success('Usuário deletado', 'Usuário: ' + user);
        setTimeout(() => {
          location.reload();
        }, 4000);
      },
      error => {
        this.notification.error('Oops!', error);
      }
    );
    this.subscriptions.push(subscription);
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
