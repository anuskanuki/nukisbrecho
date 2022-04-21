import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { States } from '../../login/enum/states.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUserModel } from '../../login/models/login.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less'],
})
export class UserFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  statesArray: Array<string> = Object.keys(States).filter(key => isNaN(+key));

  public form!: FormGroup;
  public formNewUser!: FormGroup;

  public userModel: UserModel;

  public passwordVisible = false;
  public radioValueIsAdmin = false;

  public isAdminNewUser = false;
  public routerId = '';

  gridStyle = {
    width: '33,33%',
    textAlign: 'center'
  };

  constructor(
    private location: Location,
    protected userService: UserService,
    protected authService: TokenService,
    private notification: NzNotificationService,
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { this.userModel = new UserModel(); }

  ngOnInit(): void {
    this.routerId = this.route.snapshot.params.id;

    if (this.routerId) {
      this.isAdminNewUser = false;
      this.createForm();
      this.getById(this.authService.tokenData.nameid);
    } else {
      this.isAdminNewUser = true;
      this.createFormNewUser();
    }
  }

  //#region newUser

  public submitNewUser() {
    const formNewUser = Object.assign(this.formNewUser.value, new NewUserModel());

    if (this.formNewUser.valid && this.formNewUser.dirty) {
      const subscribeNewUser = this.userService.newUser(formNewUser).subscribe(() => {
        this.notification.success('Sucesso :)', 'Usuário novo criado.');
        this.router.navigateByUrl('/welcome');
      },
        error => {
          this.notification.error('Ops!', 'Ocorreu um erro, tente novamente.' + '\n' + error);
        });
      this.subscriptions.push(subscribeNewUser);
    }
  }

  private createFormNewUser() {
    this.formNewUser = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      isAdmin: [null, [Validators.required]],
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
  //#endregion newUser

  //#region profileMethods

  private mapModelToForm() {
    this.form.patchValue({
      name: this.userModel.name,
      email: this.userModel.email,
    });

    this.form.controls['address'].patchValue({
      zipCode: this.userModel.address?.zipCode,
      street: this.userModel.address?.street,
      state: this.userModel.address?.state,
      number: this.userModel.address?.number,
      neighborhood: this.userModel.address?.neighborhood,
      city: this.userModel.address?.city,
      addressDetails: this.userModel.address?.addressDetails
    });
  }

  private getById(id: string) {
    const subscription = this.userService.getById(id).subscribe(
      response => {
        this.userModel = response;
        this.mapModelToForm();
      },
      error => this.notification.error('Oops!', error)
    );
    this.subscriptions.push(subscription);
  }

  public submitUpdateUser() {
    if (this.form.valid && this.form.dirty) {
      const subscribeUpdateuser = this.userService.updateUser(this.authService.tokenData.nameid, this.form.value).subscribe(() => {
        this.notification.success('Sucesso :)', 'Dados de perfil atualizados!');
        this.router.navigateByUrl('/welcome');
      },
        error => {
          this.notification.error('Ops!', 'Ocorreu um erro, tente novamente.' + '\n' + error);
        });
      this.subscriptions.push(subscribeUpdateuser);
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
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

  //#endregion profileMethods

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
