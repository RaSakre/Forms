import type { FieldValue } from "firebase/firestore";

export interface IForm {
  id?: string;
  name: string;
  description: string;
  fields: IField[];
  userId: string | undefined;
  createdAt?: FieldValue | number;
  updatedAt?: FieldValue | number;
  answers?: Record<string, string | string[]>;
}

export interface IUser {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: FieldValue | Date;
  updatedAt?: FieldValue | Date;
}

export interface IProfileData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IRegisterModel {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IField {
  component: string;
  options: QuestionText | QuestionSelect;
}

export type QuestionType = "text" | "select";

export interface QuestionBase {
  id: string;
  type: QuestionType;
  question: string;
  isRequired: boolean;
  answer?: string | string[];
  icon: string;
}

export interface QuestionText extends QuestionBase {
  type: "text";
  isOneRow: boolean;
}

export interface QuestionSelect extends QuestionBase {
  type: "select";
  options: string[];
  isMultiSelect: boolean;
}
