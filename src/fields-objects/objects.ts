import type { QuestionText, QuestionSelect, IField } from "@/types/formTypes";
import { v4 as uuidv4 } from "uuid";


export class OneRow implements IField {
    component: string = "TextField"
    options: QuestionText = {
        id: uuidv4(),
        isOneRow: true,
        isRequired: false,
        question: '',
        type: 'text',
        icon: 'pencil',
    }
}

export class MultiRow implements IField {
    component: string = "TextField"
    options: QuestionText = {
        id: uuidv4(),
        isOneRow: false,
        isRequired: false,
        question: '',
        type: 'text',
        icon: 'align-left',
    }
}

export class Radio implements IField {
    component: string = "SelectField"
    options: QuestionSelect = {
        id: uuidv4(),
        isRequired: false,
        question: '',
        type: 'select',
        options: [''],
        isMultiSelect: false,
        icon: 'check-circle',
    }
}

export class Checkbox implements IField {
    component: string = "SelectField"
    options: QuestionSelect = {
        id: uuidv4(),
        isRequired: false,
        question: '',
        type: 'select',
        options: [''],
        isMultiSelect: true,
        icon: 'plus-circle',
    }
}



