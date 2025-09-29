import type { FieldValue } from "firebase/firestore";

// export interface Form  {
//     id?: string;
//     name: string;
//     description: string;
//     questions: Array<QuestionText | QuestionSelect>;
//     createdAt?: FieldValue;
// }



export interface IForm {
    id: string;
    name: string;
    description: string;
    fields: IField[];
    createdAt?: FieldValue;
}

export interface IField {
    component: string;
    options: QuestionText | QuestionSelect
}

export type QuestionType = 'text' | 'select';

export interface QuestionBase  {
    id: string;
    type: QuestionType;
    question: string;
    isRequired: boolean;
    image: string;
    answer?: string | string[];
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