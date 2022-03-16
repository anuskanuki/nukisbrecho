import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

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
    this.buildForm();
    this.loadForm();
  }

  private loadForm() {
    this.routerId = this.route.snapshot.params.id;
    if (this.routerId) {
      this.getById(this.routerId);
      this.edition = true;
    } else {
      this.edition = false;
    }
  }

  private getById(id: string) {
    const subscription = this.userService.getById(id).subscribe(
      response => {
        this.mapModelToForm(response);
        this.userModel = response;
        if (response.claim) {
          this.radioValue = response.claim.toString();
        }
      },
      error => this.notification.error('Oops!', error)
    );
    this.subscriptions.push(subscription);
  }

  private mapModelToForm(model: UserModel) {
    this.userModel = model;

    this.form.patchValue({
      id: this.userModel.id,
      claim: this.userModel.claim,
      completeName: this.userModel.completeName,
      completeAddress: this.userModel.completeAddress,
      email: this.userModel.email,
      mobileNumber: this.userModel.mobileNumber,
      profilePicture: this.userModel.profilePicture,
      password: this.userModel.password,
      confirmPassword: this.userModel.confirmPassword,
      notificationsNumber: this.userModel.notificationsNumber,
    });
  }

  public submit() {
    console.log(this.form);

    if (this.form.valid && this.form.dirty) {
      if (!this.userModel.id) {
        this.mapFormToModel(false);
        const subscription = this.userService.insert(this.userModel).subscribe(
          () => this.savingSuccess('Usuário inserido!'),
          error => {
            this.notification.error('Oops!', error)
          }
        );
        this.subscriptions.push(subscription);
      } else {
        this.mapFormToModel(true);
        const subscription = this.userService.edit(this.userModel).subscribe(
          () => this.savingSuccess('Usuário atualizado!'),
          error => {
            this.notification.error('Oops!', error)
          }
        )
        this.subscriptions.push(subscription);
      }
    }
  }

  private savingSuccess(message: string) {
    this.form.reset();
    this.userModel = {};
    this.notification.success('Sucesso!', message),
      setTimeout(() => {
        this.back();
      }, 500);
  }

  private mapFormToModel(editing: boolean) {
    if (editing) {
      this.userModel = {
        id: this.userModel.id,
        claim: this.form.value.claim,
        completeName: this.form.value.completeName,
        completeAddress: this.form.value.completeAddress,
        email: this.form.value.email,
        mobileNumber: this.form.value.mobileNumber,
        profilePicture: this.form.value.profilePicture,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
      };
    } else {
      this.getNewUserId();
      this.userModel = {
        id: this.newUserId,
        claim: this.form.value.claim,
        completeName: this.form.value.completeName,
        completeAddress: this.form.value.completeAddress,
        email: this.form.value.email,
        mobileNumber: this.form.value.mobileNumber,
        profilePicture: this.form.value.profilePicture,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
      };
    }
  }

  getNewUserId() {
    const subscription = this.userService.getAll().subscribe(
      response => {
        this.newUserId = response.length + 1;
      },
      error => this.notification.error('Oops!', error)
    );
    this.subscriptions.push(subscription);
    return this.newUserId;
  }

  back(): void {
    this.location.back();
  }

  protected buildForm() {
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      claim: [null, [Validators.required]],
      completeName: [null, [Validators.required]],
      completeAddress: [null, [Validators.required]],
      email: [null, [Validators.required]],
      notificationsNumber: [null, [Validators.required]],
      mobileNumber: [null, [Validators.required]],
      profilePicture: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateConfirmPassword(): void {
    // setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
