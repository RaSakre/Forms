import type { QuestionText, QuestionSelect, IField } from "@/types/formTypes";
import { v4 as uuidv4 } from "uuid";
import pencil from '@/assets/constructor/constructor-pen.svg';
import lines from '@/assets/constructor/constructor-lines.svg';
import singleSelect from '@/assets/constructor/constructor-check.svg'
import multiSelect from '@/assets/constructor/constructor-plus.svg'

export const oneRow: IField = {
    component: 'TextField',
    options: {
    id: uuidv4(),
    isOneRow: true,
    isRequired: false,
    question: '',
    type: 'text',
    image: pencil,
    }
    
}

export const multiRow: IField = {
    component: 'TextField',
    options: {
    id: uuidv4(),
    isOneRow: false,
    isRequired: false,
    question: '',
    type: 'text',
    image: lines,
    }
    
}

export const radio: IField = {
    component: 'SelectField',
    options: {
    id: uuidv4(),
    isRequired: false,
    question: '',
    type: 'select',
    options: [''],
    image: singleSelect,
    isMultiSelect: false,
    }
    
}

export const checkbox: IField = {
    component: 'SelectField',
    options: {
    id: uuidv4(),
    isRequired: false,
    question: '',
    type: 'select',
    options: [],
    image: multiSelect,
    isMultiSelect: true,
    }

}




