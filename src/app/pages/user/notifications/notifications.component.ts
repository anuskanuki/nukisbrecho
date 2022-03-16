import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationModel } from '../models/notification.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public notificationsList: NotificationModel[] = [];
  public isAdminRole = false;

  private _userId: number = 1;


  constructor(
    private location: Location,
    protected notificationService: UserService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    if (!this.isAdminRole) {
      const subscription = this.notificationService.getUserNotifications(this._userId).subscribe(
        response => {
          if (response.length) {
            this.notificationsList = response;
          } else {
            this.notificationsList = [];
          }
        },
        error => {
          this.notification.error('Oops!', error);
        }
      )
      this.subscriptions.push(subscription);
    } else {
      const subscription = this.notificationService.getAdminNotifications().subscribe(
        response => {
          if (response.length) {
            this.notificationsList = response;
          } else {
            this.notificationsList = [];
          }
        },
        error => {
          this.notification.error('Oops!', error);
        }
      )
      this.subscriptions.push(subscription);
    }
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
