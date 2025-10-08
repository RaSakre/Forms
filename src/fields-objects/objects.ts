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
        iconColor: 'var(--text-color)',
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
        iconColor: 'var(--text-color)',
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
        iconColor: 'var(--text-color)',
        
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
        icon: 'list-check',
        iconColor: 'var(--text-color)',
    }
}



