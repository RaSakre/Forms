<template>
    <div class="form-wrapper">
        <div v-if="currentForm" class="form-text">
            <h2 class="form-title">{{ currentForm.name }}</h2>
            <p class="form-description">{{ currentForm.description }}</p>
        </div>

        <form @submit.prevent="onSubmit" class="form">
            <div v-for="(question, index) in currentForm?.fields" :key="question.options.id" class="question-wrapper">
                <label class="label-form">
                    <span class="question-title">{{ question.options.question }}
                        <div v-if="question.options.isRequired" class="required"></div>
                    </span>
                    <template v-if="question.options.type === 'text' && question.options.isOneRow">
                        <Input @update:modelValue="(value:string) => addAnswer(value, question)" v-model="inputAnswer" :key="question.options.id"  :variant="'gray'" type="text" />
                    </template>

                    <template v-else-if="question.options.type === 'text' && !question.options.isOneRow">
                        <textarea @input="addAnswer($event.target?.value, question)" v-model="textAreaAnswer" class="form-textarea" rows="3"></textarea>
                    </template>

                    <template v-else-if="question.options.type === 'select' && !question.options.isMultiSelect">
                        <div class="options-wrapper">
                            <div v-for="option in question.options.options" :key="option" class="option-wrapper">
                                <Radio @update:modelValue="(value:string) => addAnswer(value, question)" v-model="radioAnswer" :value="option" :name="`option-${index}`"  />
                                <span>{{ option }}</span>
                            </div>
                        </div>
                    </template>

                    <template v-else-if="question.options.type === 'select' && question.options.isMultiSelect">
                        <div v-for="option in question.options.options" :key="question.options.id"
                            class="option-wrapper">
                            <Checkbox @update:modelValue="(value:string) => addAnswer(value, question)" v-model="checkboxAnswer" :value="option" :name="`option-${index}`" />
                            <span>{{ option }}</span>
                        </div>
                    </template>
                </label>
            </div>
            <div class="form-buttons">
                <Button type="submit" :text="'Отправить форму'" :variant="'orange'" />
                <router-link :to="{
                    name: 'constructor',
                    params: { formId: currentForm?.id },
                }">
                    <Button :text="'Редактировать форму'" :variant="'orange'" />
                </router-link>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
// нужна переменная которая будет отслеживать заполнил ли я инпуты у которых поле isRequired = true
import { useFormsStore } from '@/store/forms'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Input from '@/components/UI/Input.vue'
import Button from '@/components/UI/Button.vue'
import Radio from '@/components/UI/Radio.vue'
import Checkbox from '@/components/UI/Checkbox.vue'
import type { IField } from '@/types/formTypes'


const route = useRoute()
const formStore = useFormsStore()


const currentForm = computed(() => {
    return formStore.forms.find((form) => form.id === String(route.params.id))
})


const inputAnswer = ref<string>('')
const textAreaAnswer = ref<string>('')
const radioAnswer = ref<string>('')
const checkboxAnswer = ref<string>('')

const addAnswer = (value:string, question:IField): void => {
    question.options.answer = value
    if (question.options.type === 'select' && question.options.isMultiSelect) {
        if(!Array.isArray(question.options.answer)) {
            question.options.answer = []
        }
        question.options.answer.push(value) // ???
    }
}

const onSubmit = (): void => {

}
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

.form-title {
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