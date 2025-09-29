<template>
    <form @submit.prevent="handleSubmit">
      <slot :errors="errors" />
    </form>
  </template>
  
  <script setup lang="ts">
  import { reactive } from "vue";
  
  const props = defineProps({
    onSubmit: {
      type: Function,
      required: true,
    },
    rules: {
      type: Object,
      required: false,
    },
    model: {
      type: Object,
      required: true,
    },
  });
  
  const errors = reactive<Record<string, string>>({});
  
  const validate = () => {
    Object.keys(errors).forEach((k) => delete errors[k]); // очищаем ошибки
  
    if (props.rules) {
      for (const field in props.rules) {
        const fieldRules = props.rules[field];
        const value = props.model[field];
  
        for (const ruleFn of fieldRules) {
          const result = ruleFn(value, props.model);
          if (result !== true) {
            errors[field] = result as string;
            break; // берём первую ошибку
          }
        }
      }
    }
  
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validate()) {
      props.onSubmit(props.model);
    }
  };
  
  defineExpose({
    validate,
    errors,
  });
  </script>
  