import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationModel } from '../models/notification.model';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AdminNotificationService } from '../services/admin-notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public notifications: NotificationModel[] = [];

  constructor(
    private location: Location,
    protected notificationService: NotificationService,
    protected adminNotificationService: AdminNotificationService,
    protected tokenService: TokenService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  private getNotifications() {
    let subscription = new Subscription();
    if (this.tokenService.tokenData.isAdmin) {
      subscription = this.adminNotificationService.getNotifications().subscribe(
        response => this.notifications = response ?? [],
        error => this.notification.error('Oops!', error)
      )
    } else {
      subscription = this.notificationService.getNotificationsByUserId(this.tokenService.tokenData.nameid).subscribe(
        response => this.notifications = response ?? [],
        error => this.notification.error('Oops!', error)
      )
    }
    this.subscriptions.push(subscription);
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
