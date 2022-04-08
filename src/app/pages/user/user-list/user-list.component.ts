import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public userList: UserModel[] = [];
  public userListApi: any = [];

  constructor(
    private location: Location,
    protected userService: UserService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUsersList();
    this.getUsersListApiTest();
  }

  getUsersListApiTest() {
    const subscription = this.userService.getAllTesteApi().subscribe(
      response => {
        if (response.length) {
          this.userListApi = response;
        } else {
          this.userListApi = [];
        }
      },
      error => {
        this.notification.error('Oops!', error);
      }
    )
    this.subscriptions.push(subscription);
    console.log('userList Backend:', this.userListApi);
  }

  getUsersList() {
    const subscription = this.userService.getAll().subscribe(
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
    this.subscriptions.push(subscription);
  }

  back(): void {
    this.location.back();
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

  newUser() {
    this.router.navigate(['/user/form/']);
  }

  edit(userId: number = 1) {
    this.router.navigate(['/user/form/', userId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
