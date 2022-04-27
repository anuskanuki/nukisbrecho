import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { WelcomeHelpService } from '../services/welcome-help.service';
import { StarsModel } from '../models/welcome-help.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less']
})
export class HelpComponent implements OnInit, OnDestroy {

  panels = [
    {
      active: false,
      template: 0,
      name: 'Quem somos?',
    },
    {
      active: false,
      template: 1,
      name: 'Como comprar?',
    },
    {
      active: false,
      template: 2,
      name: 'Avaliações'
    },
    {
      active: false,
      template: 3,
      name: 'Contato'
    }
  ];

  starsHelpModel = new StarsModel();
  disableVoting = false;
  subscriptions: Subscription[] = [];

  constructor(
    private location: Location,
    private helpService: WelcomeHelpService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getStarsAverage();
  }

  getStarsAverage() {
    this.helpService.getStarsAverage().subscribe(
      response => {
        if (response) {
          this.starsHelpModel = response;
        }
      },
      error => {
        this.notification.error('Oops!', error);
      }
    );
  }

  rateStore(vote: number) {
    const starModel = { ...this.starsHelpModel };

    starModel.votersCount++;
    starModel.starsTotal += vote;
    starModel.starsAverage = (starModel.starsTotal / starModel.votersCount);

    const subscription = this.helpService.editStars(starModel).subscribe(
      () => {
        this.starsHelpModel.starsAverage = starModel.starsAverage;
        this.disableVoting = true;
        this.createBasicNotification();
      },
      error => {
        this.notification.error('Oops!', error)
      }
    )
    this.subscriptions.push(subscription);
  }

  createBasicNotification(): void {
    this.notification
      .blank(
        'Avaliação enviada :)',
        'Sua opinião é muito importante para continuarmos evoluindo! Contate-nos se necessário.'
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }
}
