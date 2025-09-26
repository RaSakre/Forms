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
          <template v-for="field in currentForm?.fields" :key="field.options.id">
            <component :is="components[field.component]" :state="currentForm" :question="question.options"/>
          </template>
        </label>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useFormsStore } from '@/store/forms';
import { computed, type Component } from 'vue';
import { useRoute } from 'vue-router';
import TextField from './fields/TextField.vue';
import SelectField from './fields/SelectField.vue';

const components: Record<string, Component> = {
  'TextField': TextField,
  'SelectField': SelectField
}
const route = useRoute()
const formStore = useFormsStore()
const currentForm = computed(() => {
  return formStore.forms.find((form) => form.id === String(route.params.id))
})

const onSubmit = () => {
  console.log('submit')
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
</style>