<template>
    <div class="main">
        <div class="container">
            <div class="hero-section">
                <div class="hero-section__left">
                    <button @click="router.push('/')" class="back-btn">
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
                        <form @submit.prevent="saveForm" action="" class="constructor-form">
                            <button @click.prevent="addQuestion({
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
                            <button @click.prevent="addQuestion({
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
                            <button @click.prevent="addQuestion({
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
                            <button @click.prevent="addQuestion({
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
                                <div class="actions-buttons">
                                    <Button :isLoading="formsStore.isLoading" style="width: 100%;" :variant="'white'"
                                        :text="'Сохранить форму'" type="submit" :img="saveIcon" />
                                    <router-link v-if="showViewButton"
                                        :to="`/form/${state.id}`">
                                        <Button style="width: 100%;" :variant="'gray'" :text="'Просмотр'" />
                                    </router-link>

                                    <Button v-if="formsStore.currentEditingFormId === state.id"
                                        @click.prevent="deleteForm" :img="deleteFormIcon" style="width: 100%;"
                                        :variant="'red'" :text="'Удалить форму'" />
                                </div>
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
                                    <TextField :question="question" :state="state" />
                                </template>
                                <template v-else-if="question.type === 'select'">
                                    <SelectField :question="question" :state="state" />
                                </template>
                            </div>
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        </div>
        <Popup  :show="showPopup"/>
    </div>
</template>
<script setup lang="ts">
import Button from '@/components/UI/Button.vue';
import Input from '@/components/UI/Input.vue';
import Popup from '@/components/UI/Popup.vue';
import TextField from '@/components/fields/TextField.vue';
import SelectField from '@/components/fields/SelectField.vue';

import saveIcon from '@/assets/constructor-save.svg';
import lines from '@/assets/constructor-lines.svg';
import pencil from '@/assets/constructor-pen.svg';
import singleSelect from '@/assets/constructor-check.svg'
import multiSelect from '@/assets/constructor-plus.svg'
import deleteFormIcon from '@/assets/index-thrash.svg'

import { v4 as uuidv4 } from 'uuid';
import { computed, onMounted, ref, TransitionGroup, watch } from 'vue';

import type { Form, QuestionSelect, QuestionText } from '@/types/formTypes';
import { useFormsStore } from '@/store/forms';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute()
const router = useRouter()
const formsStore = useFormsStore()

const showPopup = ref<boolean>(false)


const state = ref<Form>({
    name: '',
    description: '',
    questions: []
})



const saveForm = async () => {
    const formId = await formsStore.addForm(state.value);
    state.value.id = formId;
    showPopup.value = true
    setTimeout(() => {
        showPopup.value = false
    }, 2000)
}

const resetForm = (): void => {
    state.value = {
        name: '',
        description: '',
        questions: []
    }
    isDescriptionWritten.value = false
    isNameWritten.value = false
}

const deleteForm = () => {
    if (formsStore.currentEditingFormId) {
        formsStore.deleteForm(formsStore.currentEditingFormId);
        formsStore.clearEditingForm();
        resetForm();
    }
}

const showViewButton = computed(() => {
    const isEditingCurrentForm = formsStore.currentEditingFormId === state.value.id
    const isViewingSameForm = state.value.id && state.value.id === route.params.formId

    return isEditingCurrentForm || isViewingSameForm
})

onMounted(() => {
    formsStore.clearEditingForm();
    loadDataFromForm()
});


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

const addQuestion = (question: QuestionText | QuestionSelect): void => {
    switch (question.type) {
        case 'text':
            state.value.questions.push(question)
            break;
        case 'select':
            state.value.questions.push(question)
            break;
    }
}

const loadDataFromForm = () => {
    if (route.params.formId) {
        const form =  formsStore.forms.find((form) => form.id === route.params.formId);
        if (form) {
            state.value = {...form}
            isDescriptionWritten.value = true;
            isNameWritten.value = true;
        }
    }
}

watch(() => route.params.formId, () => {
    loadDataFromForm()
}
)

</script>
<style scoped>
.main {
    position: relative;
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

.form-lower {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.form-lower__item {
    border: 1px solid gray;
    padding: 15px;
    border-radius: 10px;
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

.actions-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px
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