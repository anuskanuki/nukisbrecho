export class ChatModel {
    public id?: string;
    public productId?: string;
    public questions?: QuestionModel[];
}

export class QuestionModel {
    public questionId?: string;
    public author?: string;
    public question?: string;
    public answer?: string;
}
