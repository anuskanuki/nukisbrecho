import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationModel } from '../models/notification.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { TokenService } from 'src/app/core/services/token.service';

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
    protected tokenService: TokenService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.getNotificationsByUserId();
  }

  private getNotificationsByUserId() {
    const subscription = this.notificationService.getNotificationsByUserId(this.tokenService.tokenData.nameid).subscribe(
      response => this.notifications = response ?? [],
      error => this.notification.error('Oops!', error)
    )
    this.subscriptions.push(subscription);
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }
}
