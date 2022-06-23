import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChatModel } from '../../../models/chat.model';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { ChatService } from '../../../services/chat.service';
import { AdminNotificationService } from 'src/app/pages/user/services/admin-notification.service';
import { NotificationModel } from 'src/app/pages/user/models/notification.model';
import { NotificationService } from 'src/app/pages/user/services/notification.service';

@Component({
  selector: 'app-product-chat',
  templateUrl: './product-chat.component.html',
  styleUrls: ['./product-chat.component.less'],
})
export class ProductChatComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  inputValue = '';
  public answerToAdminIsOpen = false;

  public messagesChatArray: ChatModel[] = [];

  public formAdminAnswer!: FormGroup;
  public formUserQuestion!: FormGroup;

  public isAdminClaim = false;
  public userLoggedIn = false;

  submitting = false;

  public newQuestionId = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] = [];
  @Input() routerId = '';
  @Input() productIsActive = true;

  constructor(
    protected chatService: ChatService,
    private formBuilder: FormBuilder,
    private authService: TokenService,
    private notification: NzNotificationService,
    private adminNotificationService: AdminNotificationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userLoggedIn = true;
      this.isAdminClaim = this.authService.tokenData.isAdmin;
    }
    this.buildForm();
    this.getMessages();
  }

  public openAnswerToAdmin(answering: boolean) {
    this.answerToAdminIsOpen = true;
  }

  public getMessages() {
    const subscription = this.chatService
      .getByProductId(+this.routerId)
      .subscribe(
        (response) => {
          this.messagesChatArray = response;
        },
        (error) => {
          this.notification.error('Oops!', error);
        }
      );
    this.subscriptions.push(subscription);
  }

  protected buildForm() {
    if (this.isAdminClaim) {
      this.formAdminAnswer = this.formBuilder.group({
        answer: [null],
      });
    } else {
      this.formUserQuestion = this.formBuilder.group({
        question: [null],
      });
    }
  }

  public sendQuestion() {
    if (this.formUserQuestion.valid && this.formUserQuestion.dirty) {
      const subscription = this.chatService
        .create(this.mapQuestionToModel())
        .subscribe({
          next: () => {
            this.inputValue = '';
            this.notification.success('Sucesso!', 'Pergunta enviada');
            this.notifyAdminsPromise();
            this.getMessages();
          },
          error: (error) => {
            this.notification.error('Oops!', error);
          },
        });
      this.subscriptions.push(subscription);
      this.submitting = false;
    }
  }

  private mapQuestionToModel(): ChatModel {
    const chat = new ChatModel();
    chat.productId = this.routerId;
    chat.question = this.inputValue;
    chat.answer = '';
    chat.userId = this.authService.tokenData.nameid;

    return chat;
  }

  private notifyAdminsPromise(): void {
    const subscription = this.adminNotificationService
      .insert(this.mapAdminNotificationToModel())
      .subscribe();
    this.subscriptions.push(subscription);
  }

  private mapAdminNotificationToModel(): NotificationModel {
    return {
      title: 'Nova pergunta recebida!',
      description: `O usuário @${this.authService.tokenData.unique_name} fez uma pergunta!`,
      routeLinkTo: `/product/${this.routerId}`,
      // TO-DO: verificar possibilidade de colocar e renderizar a imagem do asset
      // image: this.productModel.photo1,
      image: '',
      read: false,
    };
  }

  public sendAnswer(id: string, userId: string) {
    const subscription = this.chatService
      .update(this.mapAnswerToModel(id))
      .subscribe({
        next: () => this.notifyUserPromise(userId),
      });

    this.subscriptions.push(subscription);
  }

  private notifyUserPromise(id: string): void {
    const subscription = this.notificationService
      .insert(this.mapUserNotificationToModel(id))
      .subscribe({
        next: () => {
          this.inputValue = '';
          this.notification.success('Sucesso!', 'Resposta enviada.');
          this.getMessages();
        },
        error: (error) => this.notification.error('Oops!', error),
      });
    this.subscriptions.push(subscription);
  }

  private mapAnswerToModel(id: string): ChatModel {
    const chat = this.messagesChatArray.filter((x) => x.id === id)[0];
    chat.answer = this.inputValue;

    return chat;
  }

  private mapUserNotificationToModel(userId: string): NotificationModel {
    return {
      title: 'Sua pergunta foi respondida!',
      description: `Clique aqui para acessar o produto`,
      routeLinkTo: `/product/${this.routerId}`,
      // TO-DO: verificar possibilidade de colocar e renderizar a imagem do asset
      // image: this.productModel.photo1,
      image: '',
      read: false,
      userId: userId,
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscripition) => subscripition.unsubscribe());
  }
}
