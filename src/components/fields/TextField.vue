<template >
    <Input v-model="question.question" :variant="'gray'" :placeholder="'Вопрос'" :type="'text'" />
    <div class="form-item-lower">
        <div class="form-item-lowerleft">
            <img :src="question.image" alt="">
            <p v-if="question.type === 'text'">{{ question.isOneRow ? 'Однострочный ответ' : 'Многострочный ответ' }}</p>
        </div>
        <div class="form-item-lowerright">
            <label class="modern-toggle" :ref="el => addToggleRef(el, question.id)">
                <input type="checkbox" :checked="question.isRequired" @change="toggleQuestion(question.id)" />
                <span class="modern-slider">
                    <span class="toggle-knob"></span>
                </span>
            </label>
            <img style="cursor: pointer;" src="../../assets/delete.svg" alt="" @click="deleteQuestion(question.id)" />
        </div>
    </div>
</template>
<script setup lang='ts'>
import type { QuestionText, Form, IForm } from '@/types/formTypes';
import Input from '../UI/Input.vue';
import { ref } from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
interface Props {
    question: QuestionText,
    state: IForm,
}
const props = defineProps<Props>()

const toggleRefs = ref(new Map())

const addToggleRef = (el: any, questionId: string) => {
    if (el && !toggleRefs.value.has(questionId)) {
        toggleRefs.value.set(questionId, el)
        tippy(el, {
            content: 'Обязательное поле',
            placement: 'top',
            arrow: true,
            animation: 'fade',
        })
    }
}

const toggleQuestion = (questionId: string) => {
    const question = props.state.fields.find(q => q.options.id === questionId)
    if (question) {
        question.options.isRequired = !question.options.isRequired
    }
}

const deleteQuestion = (id: string): void => {
    props.state.fields = props.state.fields.filter((question) => question.options.id !== id)
}

// const field = defineModel<QuestionText>({required: true, default: () => ({
//     id: '',
//     type: 'text',
//     question: '',
//     image: '',
//     isRequired: false,
//     isOneRow: false,
// })})
</script>
<style >
.form-item-lower {
    position: relative;
    margin-top: 30px;
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.form-item-lowerright {
    display: flex;
    align-items: center;
    gap: 10px;
}

.form-item-lower::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgb(128 128 128 / 30%)
}





.form-item-lowerleft {
    display: flex;
    gap: 5px;
}

.form-item-lowerleft img {
    width: 20px;
}

.form-item-lowerright img {
    width: 20px;
}

.modern-toggle {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 32px;
}

.modern-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.modern-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #cccccc 0%, #aaaaaa 100%);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 16px;
    box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.1),
        0 1px 2px rgba(0, 0, 0, 0.1);
}

.modern-slider:before {
    content: '';
    position: absolute;
    height: 28px;
    width: 28px;
    left: 2px;
    bottom: 2px;
    background: white;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 50%;
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.2),
        0 1px 2px rgba(0, 0, 0, 0.1);
    z-index: 2;
}

.toggle-knob {
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    transition: all 0.3s ease;
    opacity: 0.7;
}

input:checked+.modern-slider {
    background: linear-gradient(135deg, #ff7b00 0%, #ff5500 100%);
    box-shadow:
        inset 0 2px 4px rgba(255, 123, 0, 0.3),
        0 1px 2px rgba(255, 123, 0, 0.2);
}

input:checked+.modern-slider:before {
    transform: translateX(28px);
}

input:checked+.modern-slider .toggle-knob {
    left: calc(100% - 12px);
    background: rgba(255, 255, 255, 0.8);
}

/* Анимация при наведении */
.modern-toggle:hover .modern-slider {
    transform: scale(1.05);
}

/* Активное состояние */
input:active+.modern-slider:before {
    width: 32px;
}

input:checked:active+.modern-slider:before {
    transform: translateX(24px);
}
</style>