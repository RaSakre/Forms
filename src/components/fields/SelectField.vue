<template>
    <Input v-model="question.question" :variant="'gray'" :placeholder="'Вопрос'" :type="'text'" disabled />
    <Input v-for="(item, index) in question.options" :key="question.id"
        :image="question.isMultiSelect ? selectSquare : selectCircle" :type="'text'" v-model="question.options[index]"
        :placeholder="`Вариант ${index + 1}`"
        :style="[question.options.length > 1 ? { 'width': '95%' } : { 'width': '100%' }]" :variant="'gray'">
    <img class="deleteSelect" @click="deleteSelectOption(question.id, index)" v-if="question.options.length > 1"
        src="../../assets/delete.svg" alt="">
    </Input>
    <div class="addBtn">
        <button @click="question.options.push('')">Добавить</button>
    </div>
    <div class="form-item-lower">
        <div class="form-item-lowerleft">
            <img :src="question.image" alt="">
            <p>{{ question.isMultiSelect ? 'Список множественного выбора' : 'Список одиночного выбора' }}</p>
        </div>

        <div class="form-item-lowerright">
            <label class="modern-toggle" :ref="el => addToggleRef(el, question.id)">
                <input type="checkbox" :checked="question.isRequired" @change="toggleQuestion(question.id)" />
                <span class="modern-slider">
                    <span class="toggle-knob"></span>
                </span>
            </label>
            <img @click="deleteQuestion(question.id)" style="cursor: pointer;" src="../../assets/delete.svg" alt="">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Input from '../UI/Input.vue';
import type { QuestionSelect, Form } from '@/types/formTypes';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import selectSquare from '@/assets/square-select.svg'
import selectCircle from '@/assets/circle-select.svg'

interface Props {
    question: QuestionSelect,
    state: Form,
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
    const question = props.state.questions.find(q => q.id === questionId)
    if (question) {
        question.isRequired = !question.isRequired
    }
}

const deleteQuestion = (id: string): void => {
    props.state.questions = props.state.questions.filter((question) => question.id !== id)
}

const deleteSelectOption = (id: string, index: number): void => {
    const question = props.state.questions.find(q => q.id === id)
    if (question && question.type === 'select') {
        question.options.splice(index, 1)
    }
}
</script>
<style scoped>
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


.form-lower__item div:not(:last-child) {
    margin-bottom: 15px;
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

.addBtn button {
    background-color: rgb(128 128 128 / 30%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.addBtn button:hover {
    background-color: rgb(128 128 128 / 40%);
}

.deleteSelect {
    width: 25px;
    position: absolute;
    top: 6px;
    right: -35px;
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