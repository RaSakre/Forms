<template>
  <TransitionGroup name="list" tag="div" class="form-lower">
    <div v-for="(question, idx) in localFields" :key="question.options.id" class="form-lower__item"
      @dragstart="onDragStart(idx)" 
      @dragover.prevent="onDragOver(idx)"
      @drop="onDrop(idx)">
      <div class="form-lower__item__content">
        <template v-if="question.options.type === 'text'">
          <TextField :question="question.options" :key="question.options.id" :state="state" />
        </template>
        <template v-else-if="question.options.type === 'select'">
          <SelectField :question="question.options" :key="question.options.id" :state="state" />
        </template>
      </div>
      <div draggable="true" class="drag">
        <img src="../../assets/drag-dots.svg" alt="Перетащить">
      </div>
    </div>
  </TransitionGroup>
</template>
<script setup lang="ts">
import { computed, ref, TransitionGroup, watch, type ComputedRef, type PropType } from 'vue';
import TextField from '../fields/TextField.vue';
import SelectField from '../fields/SelectField.vue';
import type { IField, IForm } from '@/types/formTypes';

const props = defineProps({
  state: {
    type: Object as PropType<IForm>,
    required: true,
  },
});


let dragStartIndex: number | null = null;
let dragOverIndex: number | null = null;

const localFields:ComputedRef<IField[]> = computed(() => props.state.fields || [])


const onDragStart = (idx: number) => {
  dragStartIndex = idx
};

const onDragOver = (idx: number) => {
  dragOverIndex = idx;
};

const onDrop = (idx: number) => {
  if (dragStartIndex === null) return
  const movedItem: IField | undefined = localFields.value[dragStartIndex];
  if (movedItem === undefined) { return }
  localFields.value.splice(dragStartIndex, 1) 

  localFields.value.splice(idx, 0, movedItem) 
  dragStartIndex = null
  dragOverIndex = null
};
</script>

<style scoped>
.drag {
  display: flex;
  width: 29px;
  border: 1px solid gray;
  border-radius: 0px 20px 20px 0px;
  cursor: grab;
  display: flex;
  min-height: -webkit-fill-available;
  align-items: center;
  justify-content: center;
}

.form-lower__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-lower__item__content {
  border: 1px solid gray;
  padding: 15px;
  border-radius: 10px 0px 0px 10px;
  width: 100%;
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
