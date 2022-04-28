import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChatModel } from '../../../models/chat.model';
import { ProductService } from '../../../services/product.service';
import { formatDistance } from 'date-fns';
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
  public form!: FormGroup;
  public isAdminClaim = true;
  submitting = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] = [];

  @Input() routerId = "";

  constructor(
    protected productService: ProductService,
    private formBuilder: FormBuilder,
    private authService: TokenService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.isAdminClaim = this.authService.tokenData.isAdmin;
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
          console.log('response', response);
        },
        error => {
          this.notification.error('Oops!', error);
        }
      );
    this.subscriptions.push(subscription);
  }

  protected buildForm() {
    this.form = this.formBuilder.group({
      question: [null],
      answer: [null],
    });
  }

  private mapChatFormToModel(): ChatModel {
    return {
      // id: this.chatModel.id,
      productId: this.routerId,
      questions: [{
        questionId: "dar um jeito de pegar qual seria o id",
        question: "this.form.question.value",
        answer: "resposta pegar do form"
      }]
    };
  }

  public sendMessage() {
    if (this.form.valid && this.form.dirty) {
      const subscription = this.productService.sendMessage(this.mapChatFormToModel()).subscribe(
        response => {
          console.log('mensagem enviada, response:', response);
        },
        error => {
          this.notification.error('Oops!', error);
        }
      );
      this.subscriptions.push(subscription);
    }
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    // setTimeout(() => {
    //   this.sendMessage();
    //   this.submitting = false;
    //   this.data = [
    //     ...this.data,
    //     {
    //       ...this.user,
    //       content,
    //       datetime: new Date(),
    //       displayTime: formatDistance(new Date(), new Date())
    //     }
    //   ].map(e => ({
    //     ...e,
    //     displayTime: formatDistance(new Date(), e.datetime)
    //   }));
    // }, 800);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
