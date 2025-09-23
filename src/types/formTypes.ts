export interface Form  {
    id: string;
    name: string;
    description: string;
    questions: Array<QuestionText | QuestionSelect>;
}

export type QuestionType = 'text' | 'select';

export interface QuestionBase  {
    id: string;
    type: QuestionType;
    question: string;
    isRequired: boolean;
    image: string;
    answer?: string;
}

export interface QuestionText extends QuestionBase {
    type: 'text';
    isOneRow: boolean;

}

export interface QuestionSelect extends QuestionBase  {
    type: 'select';
    options: string[];
    isMultiSelect: boolean;
}