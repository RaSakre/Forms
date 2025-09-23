<template>
    <div class="form-wrapper">
        <div v-if="currentForm" class="form-text">
            <h2 class="form-title">{{ currentForm.name }}</h2>
            <p class="form-description">{{ currentForm.description }}</p>
        </div>
        
        <form @submit.prevent="onSubmit" class="form">
            <div v-for="(question, index) in currentForm?.questions" :key="question.id" class="question-wrapper">
                <label class="label-form">
                    <span class="question-title">{{ question.question }}
                        <div v-if="question.isRequired" class="required"></div>
                    </span>
                    
                    <template v-if="question.type === 'text' && question.isOneRow">
                        <Input :variant="'gray'" type="text" />
                    </template>
                    
                    <template  v-else-if="question.type === 'text' && !question.isOneRow">
                        <textarea  class="form-textarea" rows="3"></textarea>
                    </template>
                    
                    <template v-else-if="question.type === 'select' && !question.isMultiSelect">
                        <div class="options-wrapper">
                        <div v-for="option in question.options" :key="option" class="option-wrapper">
                            <Input :type="'radio'" :name="`question-${index}`"  />
                            <span>{{ option }}</span>
                        </div>
                        </div>
                    </template>
                    
                    <template v-else-if="question.type === 'select' && question.isMultiSelect">
                        <div v-for="option in question.options" :key="option" class="option-wrapper">
                            <Input :type="'checkbox'"  :value="option" />
                            <span>{{ option }}</span>
                        </div>
                    </template>
                </label>
            </div>
            <div class="form-buttons">
                <Button type="submit" :text="'Отправить форму'" :variant="'orange'"/>
                <Button :text="'Редактировать форму'" :variant="'orange'"/>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
// нужна переменная которая будет отслеживать заполнил ли я инпуты у которых поле isRequired = true
import { useFormsStore } from '@/store/formsTemplates'
import { computed, ref } from 'vue'
import Input from '@/components/UI/Input.vue'
import Button from '@/components/UI/Button.vue'


const formStore = useFormsStore()

// Получаем текущую форму (например, первую из массива или по id)
const currentForm = computed(() => {
    return formStore.forms.length > 0 ? formStore.forms[0] : null
})




const onSubmit = ():void => {

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