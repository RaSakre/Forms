<template>
    <div class="main">
        <div class="container">
            <div class="hero-section">
                <div class="hero-section__left">
                    <button class="back-btn">
                        Назад
                        <img src="../assets/constructor-arrow-back.svg" alt="">
                    </button>
                    <h1 class="hero-section__title">Создание формы</h1>
                    <div class="hero-section__constructor">
                        <div class="constructor-tabs">
                            <div class="tabs-item">
                                <img src="../assets/constructor-house.svg" alt="">
                                <p>Конструктор</p>
                            </div>
                            <div class="tabs-item">
                                <img src="../assets/constructor-settings.svg" alt="">
                                <p>Настройки</p>
                            </div>
                        </div>
                        <h2 class="constructor-title">Элементы формы</h2>
                        <form @submit.prevent="addForm" action="" class="constructor-form">
                            <button @click="addQuestion($event, {
                                type: 'text',
                                isOneRow: true,
                                question: '',
                                id: uuidv4(),
                                image: pencil,
                                isRequired: false,
                            })
                                " class="constructor-button">
                                <img src="../assets/constructor-pen.svg" alt="">
                                <p>Однострочный ответ</p>
                            </button>
                            <button @click="addQuestion($event, {
                                type: 'text',
                                isOneRow: false,
                                question: '',
                                id: uuidv4(),
                                image: lines,
                                isRequired: false,
                            })" class="constructor-button">
                                <img src="../assets/constructor-lines.svg" alt="">
                                <p>Многострочный ответ</p>
                            </button>
                            <button @click="addQuestion($event, {
                                type: 'select',
                                question: '',
                                id: uuidv4(),
                                isMultiSelect: false,
                                image: singleSelect,
                                options: [''],
                                isRequired: false,
                            })
                                " class="constructor-button">
                                <img src="../assets/constructor-check.svg" alt="">
                                <p>Список одиночного выбора</p>
                            </button>
                            <button @click="addQuestion($event, {
                                type: 'select',
                                question: '',
                                id: uuidv4(),
                                isMultiSelect: true,
                                image: multiSelect,
                                options: [''],
                                isRequired: false,
                            })
                                " class="constructor-button">
                                <img src="../assets/constructor-plus.svg" alt="">
                                <p>Список множественного выбора</p>
                            </button>
                            <div class="constructor-actions">
                                <h3 class="action-title">Действия</h3>
                                <Button style="width: 100%;" :variant="'white'" :text="'Сохранить форму'" type="submit"
                                    :img="saveIcon" />
                            </div>
                        </form>
                    </div>
                </div>
                <div class="hero-section__right">
                    <div class="hero-section__form-upper">
                        <h2 v-if="isNameWritten && state.name !== ''" class="form-title">{{ state.name }}
                            <img @click="isNameWritten = !isNameWritten" src="@/assets/constructor-edit.svg" alt="">
                        </h2>
                        <h2 v-if="isDescriptionWritten && state.description !== ''" class="form-title">{{
                            state.description }}
                            <img @click="isDescriptionWritten = !isDescriptionWritten"
                                src="@/assets/constructor-edit.svg" alt="">
                        </h2>
                        <Input v-if="!isNameWritten" @blur="handleInputBlur" v-model="state.name" :variant="'gray'"
                            :type="'text'" :placeholder="'Название'" />
                        <textarea v-if="!isDescriptionWritten" @blur="handleTextareaBlur" v-model="state.description"
                            rows="4" class="hero-section__form-description" placeholder="Описание"></textarea>
                    </div>
                    <div class="hero-section__form-lower">
                        <TransitionGroup name="list" tag="div" class="form-lower">
                            <div v-for="question in state.questions" :key="question.id" class="form-lower__item">
                                <template v-if="question.type === 'text'">
                                    <Input v-model="question.question" :variant="'gray'" :placeholder="'Вопрос'"
                                        :type="'text'" />
                                    <div class="form-item-lower">
                                        <div class="form-item-lowerleft">
                                            <img :src="question.image" alt="">
                                            <p v-if="question.type === 'text'">{{ question.isOneRow ? 'Однострочный ответ' :'Многострочный ответ' }}</p>
                                        </div>
                                        <div class="form-item-lowerright">
                                            <label class="modern-toggle">
                                                <input type="checkbox" :checked="question.isRequired"
                                                    @change="toggleQuestion(question.id)" />
                                                <span class="modern-slider">
                                                    <span class="toggle-knob"></span>
                                                </span>
                                            </label>
                                            <img style="cursor: pointer;" src="../assets/delete.svg" alt=""
                                                @click="deleteQuestion(question.id)" />
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="question.type === 'select'">
                                    <!-- Для select вопросов -->
                                    <Input v-model="question.question" :variant="'gray'" :placeholder="'Вопрос'"
                                        :type="'text'" disabled />
                                    <Input v-for="(item, index) in question.options" :key="question.id"
                                        :image="question.isMultiSelect ? selectSquare : selectCircle" :type="'text'"
                                        v-model="question.options[index]" :placeholder="`Вариант ${index + 1}`"
                                        :style="[question.options.length > 1 ? {'width': '95%' } : {'width': '100%'}]"
                                        :variant="'gray'" >
                                        <img class="deleteSelect" @click="deleteSelectOption(question.id, index)" v-if="question.options.length > 1"  src="@/assets/selects-delete.svg" alt="">
                                    </Input>
                                    <div class="addBtn">
                                        <button @click="question.options.push('')">Добавить</button>
                                    </div>
                                    <div class="form-item-lower">
                                        <div class="form-item-lowerleft">
                                            <img :src="question.image" alt="">
                                            <p>{{ question.isMultiSelect ? 'Список множественного выбора' : 'Список  одиночного выбора' }}</p>
                                        </div>
                                        
                                        <div class="form-item-lowerright">
                                            <label class="modern-toggle">
                                                <input type="checkbox" :checked="question.isRequired"
                                                    @change="toggleQuestion(question.id)" />
                                                <span class="modern-slider">
                                                    <span class="toggle-knob"></span>
                                                </span>
                                            </label>
                                            <img @click="deleteQuestion(question.id)" style="cursor: pointer;" src="../assets/delete.svg" alt="">
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        </div>
        <router-link to="/form">LINK</router-link>
    </div>
</template>
<script setup lang="ts">
import Button from '@/components/UI/Button.vue';
import Input from '@/components/UI/Input.vue';

import saveIcon from '@/assets/constructor-save.svg';
import lines from '@/assets/constructor-lines.svg';
import pencil from '@/assets/constructor-pen.svg';
import singleSelect from '@/assets/constructor-check.svg'
import selectCircle from '@/assets/circle-select.svg'
import multiSelect from '@/assets/constructor-plus.svg'
import selectSquare from '@/assets/square-select.svg'

import { v4 as uuidv4 } from 'uuid';
import { ref, TransitionGroup } from 'vue';

import type { Form, QuestionSelect, QuestionText} from '@/types/formTypes';
import { useFormsStore } from '@/store/formsTemplates';

const formsStore = useFormsStore()


const toggleQuestion = (questionId: string) => {
    const question = state.value.questions.find(q => q.id === questionId)
    if (question) {
        question.isRequired = !question.isRequired
    }
}


const state = ref<Form>({
    id: uuidv4(),
    name: '',
    description: '',
    questions: []
})

const addForm = (): void => {
    formsStore.addForm(state.value)
}

const isNameWritten = ref<boolean>(false);
const isDescriptionWritten = ref<boolean>(false);

const handleInputBlur = (): void => {
    if (state.value.name === '' && !isNameWritten.value) {
        isNameWritten.value = false;
    } else {
        isNameWritten.value = true;
    }
}

const handleTextareaBlur = (): void => {
    if (state.value.description === '' && !isDescriptionWritten.value) {
        isDescriptionWritten.value = false;
    } else {
        isDescriptionWritten.value = true;
    }
}

const addQuestion = (event: Event, question: QuestionText | QuestionSelect): void => {
    event.preventDefault()
    switch (question.type) {
        case 'text':
            state.value.questions.push(question)
            break;
        case 'select':
            state.value.questions.push(question)
            break;
    }
}

const deleteQuestion = (id: string): void => {
    state.value.questions = state.value.questions.filter((question) => question.id !== id)
}

const deleteSelectOption = (id:string, index:number): void => {
    const question = state.value.questions.find(q => q.id === id)
    if (question && question.type === 'select') {
        question.options.splice(index, 1)
    }
}






</script>
<style scoped>
.main {
    padding: 40px 0px;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.hero-section {
    display: flex;
    gap: 30px;
}

.back-btn {
    display: flex;
    color: rgb(252, 114, 1);
    flex-direction: row-reverse;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.back-btn img {
    width: 30px;
}

.hero-section__left {
    max-width: 400px;
}

.hero-section__title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
}

.hero-section__constructor {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 15px 25px;
}

.constructor-tabs {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    justify-content: center;
}

.tabs-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tabs-item img {
    width: 20px;
}

.constructor-title {
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
}

.constructor-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.constructor-button {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.constructor-button img {
    width: 20px;
}

.constructor-actions {
    position: relative;
    padding: 15px 0px;
    text-align: center;
}

.constructor-actions::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgb(128 128 128 / 30%)
}

.action-title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
}

.action-btn img {
    width: 20px;
}

.hero-section__right {
    flex-grow: 1;
    align-self: flex-end;
}

.hero-section__form-upper {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.hero-section__form-upper div {
    margin-bottom: 10px;
}

.hero-section__form-description {
    width: 100%;
    background: rgb(91 87 87 / 40%);
    border-radius: 10px;
    padding: 10px;
}

.hero-section__form-lower {
    border: 2px dotted gray;
    min-height: 300px;
    border-radius: 10px;
    padding: 20px;
}

.form-title {
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 20px;
}

.form-title img {
    cursor: pointer;
    width: 20px;
}

.form-lower__item {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 20px;
}

.form-lower__item div:not(:last-child) {
    margin-bottom: 15px;
}

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

.form-lower {
    display: flex;
    flex-direction: column;
    gap: 30px;
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

.status-text {
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #2d3748;
    transition: color 0.3s ease;
}

input:checked~.status-text {
    color: #ff7b00;
}

/* Отключенное состояние */
.modern-toggle input:disabled+.modern-slider {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>