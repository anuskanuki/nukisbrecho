import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { LoginModel, NewUserModel } from 'src/app/pages/login/models/login.model';
import { Subscription } from 'rxjs';
import { States } from './enum/states.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  statesArray: Array<string> = Object.keys(States).filter(key => isNaN(+key));
  passwordVisible = false;
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

  public isNewUser() {
    this.selectedWichMethod = true;
    this.newUser = true;
    this.registeredUser = false;
    this.createformNewUser();
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
    this.submitted = true;

    if (this.newUser) {
      const formNewUser = Object.assign(this.formNewUser.value, new NewUserModel());
      this.submitNewUser(formNewUser);
    }
    if (this.registeredUser) {
      const formRegisterUser = Object.assign(this.formUserLogin.value, new LoginModel());
      this.submitRegisteredUser(formRegisterUser);
    }
  }

  private submitNewUser(newUser: NewUserModel) {
    if (this.formNewUser.valid && this.formNewUser.dirty) {
      newUser.isAdmin = false;
      const subscribeNewUser = this.loginService.newUser(newUser).subscribe(() => {
        this.notification.success('Sucesso :)', 'Você será redirecionado ao site.');
        this.loggedIn = true;
        this.router.navigateByUrl('/welcome');
      },
        error => {
          this.notification.error('Ops!', 'Ocorreu um erro, tente novamente.' + '\n' + error);
        });
      this.subscriptions.push(subscribeNewUser);
    }
  }

  public submitRegisteredUser(userCredentials: LoginModel) {
    const subscribe = this.loginService.login(userCredentials).subscribe(() => {
      this.notification.success('Sucesso :)', 'Bem-vindo!');
      this.router.navigateByUrl('/welcome');
      this.loggedIn = true;
    },
      error => {
        this.notification.error('Ops!', 'Confira suas credenciais.' + '\n' + error);
      });
    this.subscriptions.push(subscribe);
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
      name: [null, [Validators.required]],
      address: this.formBuilder.group({
        neighborhood: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        street: [null, [Validators.required]],
        number: [null, [Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        addressDetails: [null]
      })
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
