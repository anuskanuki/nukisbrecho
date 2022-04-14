import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { NewUserModel } from '../../login/models/login.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public form!: FormGroup;
  public userModel: UserModel;
  public routerId = '';
  public newUserId = 0;
  public edition = false;
  public radioValue?: string;

  gridStyle = {
    width: '33,33%',
    textAlign: 'center'
  };

  constructor(
    private location: Location,
    protected userService: UserService,
    private notification: NzNotificationService,
    private readonly formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { this.userModel = new UserModel(); }

  ngOnInit(): void {
    this.createForm();
  }

  private getById(id: string) {
    const subscription = this.userService.getById(id).subscribe(
      response => {
        this.userModel = response;
      },
      error => this.notification.error('Oops!', error)
    );
    this.subscriptions.push(subscription);
  }

  private savingSuccess(message: string) {
    this.form.reset();
    this.userModel = {};
    this.notification.success('Sucesso!', message),
      setTimeout(() => {
        this.back();
      }, 500);
  }

  private submitUpdateUser(userModel: UserModel) {
    if (this.form.valid && this.form.dirty) {
      const subscribeNewUser = this.userService.updateUser(userModel).subscribe(() => {
        this.notification.success('Sucesso :)', 'Dados de perfil atualizados!');
      },
        error => {
          this.notification.error('Ops!', 'Ocorreu um erro, tente novamente.' + '\n' + error);
        });
      this.subscriptions.push(subscribeNewUser);
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
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

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
