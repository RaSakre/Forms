<template>
  <ul v-if="forms.length" class="forms-list">
    <FormItem v-for="form in forms" :key="form.id" :form="form" />
  </ul>
  <p style="font-size: 20px" v-else>Формы не найдены</p>
</template>

<script setup lang="ts">
  import type {IForm} from '@/types/formTypes';
  import {type PropType} from 'vue';
  import FormItem from './FormItem.vue';

  const props = defineProps({
    forms: {
      type: Array as PropType<IForm[]>,
      required: true,
    },
  });
</script>

<style>
  .forms-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
</style>
