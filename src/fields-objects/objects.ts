import type { QuestionText, QuestionSelect, IField } from "@/types/formTypes";
import { v4 as uuidv4 } from "uuid";
import pencil from '@/assets/constructor/constructor-pen.svg';
import lines from '@/assets/constructor/constructor-lines.svg';
import singleSelect from '@/assets/constructor/constructor-check.svg'
import multiSelect from '@/assets/constructor/constructor-plus.svg'



export class OneRow implements IField {
    component: string = "TextField"
    options: QuestionText = {
        id: uuidv4(),
        isOneRow: true,
        isRequired: false,
        question: '',
        type: 'text',
        image: pencil,
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
        image: lines,
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
        image: singleSelect,
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
        image: multiSelect,
    }
}



