import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChatModel } from '../../../models/chat.model';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-product-chat',
  templateUrl: './product-chat.component.html',
  styleUrls: ['./product-chat.component.less']
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
  @Input() routerId = "";
  @Input() productIsActive = true;

  constructor(
    protected productService: ProductService,
    private formBuilder: FormBuilder,
    private authService: TokenService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userLoggedIn = true;
      this.isAdminClaim = this.authService.tokenData.isAdmin;
    }
    this.buildForm();
    this.getMessages();
  }

  public openAnswerToAdmin() {
    this.answerToAdminIsOpen = true;
  }

  public getMessages() {
    const subscription = this.productService
      .getMessagesByProductId(+this.routerId)
      .subscribe(
        response => {
          this.messagesChatArray = response;
          // this.newQuestionId = response.questions.length;
          console.log('response messagesChatArray:', response);
        },
        error => {
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

  private mapQuestionToModel(): ChatModel {
    const chat = new ChatModel();
    chat.productId = this.routerId;
    chat.question = this.inputValue;
    chat.answer = "";

    return chat;
  }

  public sendQuestion() {
    this.submitting = true;
    if (this.formUserQuestion.valid && this.formUserQuestion.dirty) {
      const model = this.mapQuestionToModel();
      this.inputValue = '';
      const subscription = this.productService.sendMessage(model).subscribe(
        () => {
          this.notification.success('Sucesso!', 'Mensagem enviada.');
          this.getMessages();
        },
        error => {
          this.notification.error('Oops!', error);
        }
      );
      this.subscriptions.push(subscription);
    }
    this.submitting = false;
  }

  private mapAnswerToModel(id: string): ChatModel {
    let chat = this.messagesChatArray.filter(x => x.id === id)[0];
    chat.answer = this.inputValue;

    return chat;
  }

  public sendAnswer(id: string) {
    this.submitting = true;
    if (this.formAdminAnswer.valid && this.formAdminAnswer.dirty) {
      const model = this.mapAnswerToModel(id);
      this.inputValue = '';
      const subscription = this.productService.updateMessage(model).subscribe(
        () => {
          this.notification.success('Sucesso!', 'Mensagem enviada.');
          this.getMessages();
        },
        error => {
          this.notification.error('Oops!', error);
        }
      );
      this.subscriptions.push(subscription);
    }
    this.submitting = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }
}
