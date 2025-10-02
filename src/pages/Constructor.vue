<template>
    <div class="main">
        <div class="container">
            <div class="hero-section">
                <div class="hero-section__left">
                    <button @click="router.push('/')" class="back-btn">
                        Назад
                        <img src="../assets/constructor/constructor-arrow-back.svg" alt="" />
                    </button>
                    <h1 class="hero-section__title">Создание формы</h1>
                    <ConstructorSettings :isEditing="!!state.id" :formId="state.id" @on-add-field="addQuestion"
                        @on-delete-form="deleteForm" @on-save="saveForm" :isLoading="formsStore.isLoading"
                        @on-edit="editExistingForm" />
                </div>
                <div class="hero-section__right">
                    <div class="hero-section__form-upper">
                        <h2 v-if="isNameWritten && state.name !== ''" class="form-title">
                            {{ state.name }}
                            <img @click="isNameWritten = !isNameWritten" src="@/assets/constructor/constructor-edit.svg"
                                alt="" />
                        </h2>
                        <h2 v-if="isDescriptionWritten && state.description !== ''" class="form-title">
                            {{ state.description }}
                            <img @click="isDescriptionWritten = !isDescriptionWritten"
                                src="@/assets/constructor/constructor-edit.svg" alt="" />
                        </h2>
                        <Input v-if="!isNameWritten" @blur="handleInputBlur" v-model="state.name" :variant="'gray'"
                            :type="'text'" :placeholder="'Название'" />
                        <textarea v-if="!isDescriptionWritten" @blur="handleTextareaBlur" v-model="state.description"
                            rows="4" class="hero-section__form-description" placeholder="Описание"></textarea>
                    </div>
                    <div class="hero-section__form-lower">
                        <ConstructorFieldsList :state="state" />
                    </div>
                </div>
            </div>
        </div>
        <Popup :show="showPopup" :text="popupText" :hasError="hasPopupError"/>
    </div>
</template>
<script setup lang="ts">
import ConstructorSettings from '@/components/Constructor/ConstructorSettings.vue';
import ConstructorFieldsList from '@/components/Constructor/ConstructorFieldsList.vue';
import Popup from '@/components/UI/Popup.vue';
import { serverTimestamp } from 'firebase/firestore';
import {  onMounted, ref, watch, type Ref} from 'vue';

import type { IForm, IField } from '@/types/formTypes';
import { useFormsStore } from '@/store/forms';
import { useAuthStore } from '@/store/auth';
import { useRouter, useRoute } from 'vue-router';
import { Checkbox, MultiRow, OneRow, Radio } from '@/fields-objects/objects';

const route = useRoute();
const router = useRouter();
const formsStore = useFormsStore();
const authStore = useAuthStore();

const showPopup = ref<boolean>(false);
let popupText = ref<string>('');
let hasPopupError = ref<boolean>(false);


const state:Ref<IForm> = ref<IForm>({
    name: '',
    description: '',
    fields: [],
    userId: authStore.userState?.uid,
});

const saveForm = async () => {
    if (state.value.name !== '' && state.value.description !== '' && state.value.fields.length > 0) {
        const formId = await formsStore.addForm(state.value);
        state.value.id = formId as string;
        popupText.value = 'Форма сохранена';
        showPopup.value = true;
        setTimeout(() => {
            showPopup.value = false;
            popupText.value = '';
        }, 3000);
    } else {
        popupText.value = 'Добавьте необходимые элементы и название'
        showPopup.value = true;
        hasPopupError.value = true
        setTimeout(() => {
            showPopup.value = false;
            popupText.value = ''
            hasPopupError.value = false
        }, 2500)
    }
};

const editExistingForm = async () => {
    if (state.value.id) {
        await formsStore.editForm(state.value);
        formsStore.clearEditingForm();
        popupText.value = 'Форма отредактирована';
        showPopup.value = true;
        setTimeout(() => {
            showPopup.value = false;
            popupText.value = '';
        }, 3000);
    } else {
        console.error('Form ID is missing');
    }
};

const resetForm = (): void => {
    state.value = {
        name: '',
        description: '',
        fields: [],
        userId: '',
    };
    isDescriptionWritten.value = false;
    isNameWritten.value = false;
};

const deleteForm = () => {
    if (formsStore.currentEditingFormId || route.params.formId) {
        formsStore.deleteForm(
            formsStore.currentEditingFormId ? formsStore.currentEditingFormId : (route.params.formId as string)
        );
        formsStore.clearEditingForm();
        resetForm();
    }
};


watch(() => authStore.userState, (user) => {
    if (user) {
        state.value.userId = user.uid;
    }
}, { immediate: true });

onMounted(() => {
    formsStore.clearEditingForm();
    loadDataFromForm();
});


const isNameWritten = ref<boolean>(false);
const isDescriptionWritten = ref<boolean>(false);


const handleInputBlur = (): void => {
    if (state.value.name === '' && !isNameWritten.value) {
        isNameWritten.value = false;
    } else {
        isNameWritten.value = true;
    }
};

const handleTextareaBlur = (): void => {
    if (state.value.description === '' && !isDescriptionWritten.value) {
        isDescriptionWritten.value = false;
    } else {
        isDescriptionWritten.value = true;
    }
};

const addQuestion = (question: IField): void => {
    switch (question.options.type) {
        case 'text':
            if (question.options.isOneRow) {
                state.value.fields.push(new OneRow());
            } else {
                state.value.fields.push(new MultiRow());
            }
            break;
        case 'select':
            if (question.options.isMultiSelect) {
                state.value.fields.push(new Checkbox());
            } else {
                state.value.fields.push(new Radio());
            }
            break;
    }
};

const loadDataFromForm = async () => {
    if (route.params.formId) {
        let form = formsStore.forms.find((form) => form.id === route.params.formId);
        if (!form) {
            //@ts-ignore
            form = await formsStore.loadSingleForm(String(route.params.formId));
            console.log(form)
        }
        if (form) {
            state.value = { ...form };
            isDescriptionWritten.value = true;
            isNameWritten.value = true;
        }
    }
};

</script>

<style>
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
    gap: 15px;
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
    top: 3px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgb(128 128 128 / 30%);
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
