import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { LoginModel, NewUserModel } from 'src/app/core/models/login.model';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  log = (param: any) => console.log(param);

  subscriptions: Subscription[] = [];

  public formNewUser!: FormGroup;
  public formUserLogin!: FormGroup;
  public model?: LoginModel;
  public submitted: boolean = false;

  public selectedWichMethod: boolean = false;
  public newUser: boolean = false;
  public registeredUser: boolean = false;

  public loggedIn = false;

  constructor(
    private location: Location,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    public router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.selectedWichMethod = false;
    this.newUser = false;
    this.registeredUser = false;
  }

  back(): void {
    this.location.back();
  }

  createBasicNotification(title: string, content: string): void {
    this.notification
      .blank(
        title,
        content
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }

  public isNewUser() {
    this.selectedWichMethod = true;
    this.newUser = true;
    this.registeredUser = false;


    // this.createformNewUser();


    // const subscription = this.loginService.newUser().subscribe(
    //   response => {
    //     this. = response;
    //   },
    //   error => {
    //     this.notification.error('Oops!', error);
    //   }
    // )
    // this.subscriptions.push(subscription);
  }

  public isRegisteredUser() {
    this.selectedWichMethod = true;
    this.registeredUser = true;
    this.newUser = false;
    this.createformUserLogin();
  }

  public backToTheLoginChoices() {
    this.selectedWichMethod = false;
    this.registeredUser = false;
    this.newUser = false;
  }

  public submit() {
    // this.submitted = true;

    // if (this.newUser) {
    //   this.submitNewUser();
    // }
    // if (this.registeredUser) {
    //   this.submitRegisteredUser();
    // }

    const formNovoUsuario = Object.assign(this.formNewUser.value, new NewUserModel());

    this.log(formNovoUsuario);
  }

  private submitNewUser() {
    if (this.formNewUser.valid && this.formNewUser.dirty) {
      this.loginSuccess();
      this.loggedIn = true;
    }
  }

  public submitRegisteredUser() {

  }

  private loginSuccess() {

  }

  private createformUserLogin() {
    this.formUserLogin = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  private createformNewUser() {
    this.formNewUser = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      username: [null, [Validators.required]],
      name: [null, [Validators.required]],
      address: this.formBuilder.group({
        neighborhood: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        street: [null, [Validators.required]],
        number: [null, [Validators.required]],
        state: [null, [Validators.required]],
        addressDetails: [null, [Validators.required]]
      })
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
