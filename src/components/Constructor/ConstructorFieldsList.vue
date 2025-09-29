<template>
  <TransitionGroup name="list" tag="div" class="form-lower">
    <div v-for="question in state.fields" :key="question.options.id" class="form-lower__item">
      <template v-if="question.options.type === 'text'">
        <TextField :question="question.options" :key="question.options.id" :state="state" />
      </template>
      <template v-else-if="question.options.type === 'select'">
        <SelectField :question="question.options" :key="question.options.id" :state="state" />
      </template>
    </div>
  </TransitionGroup>
</template>
<script setup lang="ts">
  import {TransitionGroup, type PropType} from 'vue';
  import TextField from '../fields/TextField.vue';
  import SelectField from '../fields/SelectField.vue';
  import type {IForm} from '@/types/formTypes';

  const props = defineProps({
    state: {
      type: Object as PropType<IForm>,
      required: true,
    },
  });
</script>

<style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
