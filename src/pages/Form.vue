<template>
    <div v-if="!formSend" class="form-wrapper">
        <div v-if="currentForm" class="form-text">
            <h2 class="form__title">{{ currentForm.name }}</h2>
            <p class="form-description">{{ currentForm.description }}</p>
        </div>

        <form @submit.prevent="onSubmit" class="form">
            <div v-for="(question, index) in currentForm?.fields" :key="question.options.id" class="question-wrapper">
                <label class="label-form">
                    <span class="question-title">{{ question.options.question }}
                        <div v-if="question.options.isRequired" class="required"></div>
                    </span>
                    <template v-if="question.options.type === 'text' && question.options.isOneRow">
                        <Input @update:modelValue="(value: string) => {
                            addAnswer(value, question);
                        }" v-model="question.options.answer" :key="question.options.id" :variant="'gray'" type="text"
                            :placeholder="formStore.forms.find(form => form.id === currentForm?.id)?.answers?.[question.options.question]" />
                        <span v-if="isError && question.options.isRequired" class="error">{{ errorText }}</span>
                    </template>

                    <template v-else-if="question.options.type === 'text' && !question.options.isOneRow">
                        <textarea @input="handleTextareaInput($event, question)" v-model="question.options.answer"
                            :placeholder="getPlaceholder(question)" class="form-textarea" rows="3"></textarea>
                        <span v-if="isError && question.options.isRequired" class="error">{{ errorText }}</span>
                    </template>

                    <template v-else-if="question.options.type === 'select' && !question.options.isMultiSelect">
                        <div class="options-wrapper">
                            <div v-for="option in question.options.options" :key="option" class="option-wrapper">
                                <Radio @update:modelValue="(value: string) => addAnswer(value, question)"
                                    v-model="radioAnswer" :value="option" :name="`option-${index}`"
                                    :checked="formStore.forms.find(form => form.id === currentForm?.id)?.answers?.[question.options.question] === option" />
                                <span>{{ option }}</span>
                            </div>
                        </div>
                        <div class="error" v-if="isError && question.options.isRequired">{{ errorText }}</div>
                    </template>

                    <template v-else-if="question.options.type === 'select' && question.options.isMultiSelect">
                        <div v-for="option in question.options.options" :key="question.options.id"
                            class="option-wrapper">
                            <Checkbox @update:modelValue="(value: string) => addAnswer(value, question)"
                                v-model="checkboxAnswer" :value="option" :name="`option-${index}`" />
                            <span>{{ option }}</span>
                        </div>
                        <div class="error" v-if="isError && question.options.isRequired">{{ errorText }}</div>
                    </template>
                </label>
            </div>
            <div class="form-buttons">
                <Button type="submit" text="Отправить форму" :variant="'orange'" />
                <router-link :to="`/constructor/${currentForm?.id}`">
                    <Button text="Редактировать форму" :variant="'orange'" />
                </router-link>
            </div>
        </form>
        <Popup :hasError="isError" :show="showPopup" :text="popupText" />
    </div>
    <Transition name="fade">
        <div v-if="formSend" class="form-wrapper">
            <div style="text-align: center;">
                <h2 style="font-size: 30px; margin-bottom: 20px;">Форма успешно отправлена</h2>
                <Icon name="verified" style="color: green; font-size: 300px;" />
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useFormsStore } from '@/store/forms'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Radio from '@/components/UI/Radio.vue'
import Checkbox from '@/components/UI/Checkbox.vue'
import Popup from '@/components/UI/Popup.vue'
import Button from '@/components/UI/Button.vue'
import type { IField } from '@/types/formTypes'

onMounted(() => {
    formSend.value = false
})

const route = useRoute()
const formStore = useFormsStore()

const errorText = ref<string>('')
const isError = ref<boolean>(true)
const showPopup = ref<boolean>(false)
let popupText = ref<string>('');
let formSend = ref<boolean>(false)

const currentForm = computed(() => {
    return formStore.forms.find((form) => form.id === String(route.params.id))
})

const radioAnswer = ref<string>('')
const checkboxAnswer = ref<string>('')

const answer = computed(() => {
    const answer: Record<string, string> = {};

    currentForm.value?.fields.forEach((q) => {
        const question = q.options.question;
        answer[question] = q.options.answer as string || '';
    });

    return answer;
});

const addAnswer = (value: string, question: IField): void => {
    if (question.options.type === 'select' && question.options.isMultiSelect) {
        if (!Array.isArray(question.options.answer)) {
            question.options.answer = [];
        }
        if (!question.options.answer.includes(value)) {
            question.options.answer.push(value);
        } else if (question.options.answer.includes(value)) {
            question.options.answer = question.options.answer.filter((item) => item !== value);
        }
        return
    }
    question.options.answer = value
}



const validateForm = (): boolean => {
    if (!currentForm.value) return false;

    let hasError = false;

    currentForm.value.fields.forEach((field) => {
        if (field.options.isRequired) {
            const answer = field.options.answer;
            if (Array.isArray(answer)) {
                if (answer.length === 0) {
                    hasError = true;
                }
            } else {
                if (!answer || answer.trim() === '') {
                    hasError = true;
                }
            }
        }
    });

    isError.value = hasError;
    errorText.value = hasError ? 'Заполните все обязательные поля' : '';

    return !hasError;
};

const submitForm = () => {
    if (isError.value) {
        errorText.value = 'Заполните все поля'
        showPopup.value = true
        setTimeout(() => {
            popupText.value = ''
            showPopup.value = false
        }, 2500)
        return
    }
    Object.entries(answer.value).forEach(([key, value]) => {
        if (answer.value[key] === '') {
            delete answer.value[key]
        }
    })
    formStore.addAnswersToForm(route.params.id as string, answer.value)
    popupText.value = 'Форма успешно отправлена'
    showPopup.value = true
    formSend.value = true

}

const onSubmit = (): void => {
    if (validateForm()) {
        submitForm()
        showPopup.value = true
        popupText.value = 'Форма успешно отправлена'
        setTimeout(() => {
            popupText.value = ''
            showPopup.value = false
        }, 2500)
    } else {
        showPopup.value = true
        popupText.value = 'Заполните все поля'
        setTimeout(() => {
            popupText.value = ''
            showPopup.value = false
        }, 2500)
    }
}

const handleTextareaInput = (event: Event, question: any) => {
    const target = event.target as HTMLTextAreaElement;
    addAnswer(target.value, question);
};

const getPlaceholder = (question: any): string => {
    const answers = formStore.forms.find(form => form.id === currentForm.value?.id)?.answers?.[question.options.question];
    return Array.isArray(answers) ? answers.join(', ') : (answers || '');
};
</script>
<style scoped>
.form-wrapper {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 30px;
    max-width: 1000px;
    margin: 0 auto;
}

.form .question-wrapper:not(:last-child) {
    margin-bottom: 30px;
}

.form-text {
    text-align: center;
    margin-bottom: 30px;
}

.form-text>*:not(:last-child) {
    margin-bottom: 15px;
}

.form__title {
    font-size: 25px;
    font-weight: 500;
}

.question-title {
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
    font-size: 14px;
}

.required {
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    background-color: rgb(230, 11, 11);
    border-radius: 50%;
}

.options-wrapper {
    display: flex;
    gap: 15px;
}

.option-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.form-buttons {
    display: flex;
    gap: 10px;
}

.form-textarea {
    width: 100%;
    background: rgb(91 87 87 / 40%);
    border-radius: 10px;
    padding: 10px;
}

.error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    display: block;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    bottom: -10px;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    bottom: -20px;
}

/* .question-title::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 50%;
        width: 5px;
        height: 5px;
        background-color: rgb(230, 11, 11);
        border-radius: 50%;
    } */
</style>