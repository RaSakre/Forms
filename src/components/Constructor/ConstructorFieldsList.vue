<template>
  <TransitionGroup name="list" tag="div" class="form-lower">
    <div v-for="question in state.fields" :key="question.options.id" class="form-lower__item">
      <template v-if="question.options.type === 'text'">
        <TextField :question="question.options" :key="question.options.id" :state="state" />
        <div class="drag">
          <img src="../../assets/drag-dots.svg" alt="">
        </div>
      </template>
      <template v-else-if="question.options.type === 'select'">
        <SelectField :question="question.options" :key="question.options.id" :state="state" />
        <div class="drag">
          <img src="../../assets/drag-dots.svg" alt="">
        </div>
      </template>
    </div>
  </TransitionGroup>

</template>
<script setup lang="ts">
import { TransitionGroup, type PropType } from 'vue';
import TextField from '../fields/TextField.vue';
import SelectField from '../fields/SelectField.vue';
import type { IForm } from '@/types/formTypes';

const props = defineProps({
  state: {
    type: Object as PropType<IForm>,
    required: true,
  },
});
</script>

<style scoped>
.drag {
  display: flex;
  width: 29px;
  height: 100%;
  position: absolute;
  right: -29px;
  top: 0px;
  border: 1px solid gray;
  border-radius: 0px 20px 20px 0px;
}

.form-lower__item {
  position: relative;
  max-width: 750px;
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
</style>
