import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginService } from 'src/app/core/services/login.service';
import { LoginModel } from 'src/app/core/models/login.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

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
    private notification: NzNotificationService,
    private authService: AuthService,
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
      this.submitNewUser();
    }
    if (this.registeredUser) {
      this.submitRegisteredUser();
    }
  }

  private submitNewUser() {
    if (this.formNewUser.valid && this.formNewUser.dirty) {
      this.loginSuccess();
      this.loggedIn = true;
    }
  }

  public submitRegisteredUser() {
    if (this.formUserLogin.valid && this.formUserLogin.dirty) {

      const userEmail = this.formUserLogin.controls.email.value;
      const userPassword = this.formUserLogin.controls.password.value;

      const subscription = this.loginService.getUserTryingToLogIn(userEmail).subscribe(
        response => {
          if (response) {
            if (userPassword == response.password) {
              this.loginSuccess();
              this.loggedIn = true;
            } else {
              this.notification.error('Oops!', 'Senha incorreta.');
              this.loggedIn = false;
            }
          } else {
            this.notification.error('Oops!', 'Este usuário não existe.');
            this.loggedIn = false;
          }
        },
        error => {
          this.notification.error('Oops!', error);
        }
      )
      this.subscriptions.push(subscription);
    }
  }

  private loginSuccess() {
    if (true) {//authservice
      this.notification.success('Sucesso!', "Bem vindo ao Nuki's Brechó, aproveite :)");
      this.router.navigate(['/welcome']);
    } else {
      // this.authService.cleanToken();
      this.notification.error('Ops!', "Erro ao autenticar, tente novamente.");
      this.router.navigate(['/login']);
    }
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
      confirmPassword: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
