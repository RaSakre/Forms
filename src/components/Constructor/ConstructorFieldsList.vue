<template>
  <TransitionGroup name="list" tag="div" class="form-lower">
    <div v-for="(question, idx) in localFields.fields" 
    :key="question.options.id"
    class="form-lower__item"
    draggable="true"
    @dragstart="onDragStart(idx)"
    @dragover.prevent="onDragOver(idx)"
    @drop="onDrop(idx)"
    :class="{ 'drag-over': idx === dragOverIndex }">
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
import { ref, TransitionGroup, type PropType } from 'vue';
import TextField from '../fields/TextField.vue';
import SelectField from '../fields/SelectField.vue';
import type { IForm } from '@/types/formTypes';

const props = defineProps({
  state: {
    type: Object as PropType<IForm>,
    required: true,
  },
});


let dragStartIndex:number|null =null;
let dragOverIndex:number|null = null
const emit = defineEmits(['drag'])
const localFields = ref(props.state)

const onDragStart=(idx:number)=> {
      // Запоминаем, с какого индекса начали перетаскивание
      dragStartIndex = idx
      console.log('onDragStart');
};

const onDragOver=(idx:number) =>{
      // При наведении устанавливаем индекс поверх которого перетаскиваем
      dragOverIndex = idx;
      console.log('onDragOver')
};

 const onDrop=(idx:number)=> {
      if (dragStartIndex === null) return
      // Получаем копию массива
      console.log('onDrop 1 ')
      const movedItem = localFields.value.fields[dragStartIndex];
      console.log('onDrop 2 ')
      localFields.value.fields.splice(dragStartIndex, 1) // Удаляем элемент, который двигаем
      console.log('onDrop 3')
      localFields.value.fields.splice(idx, 0, movedItem) // Вставляем на новое место\
      console.log('onDrop 4')
      // localFields.value = localFields.value
      // Сбрасываем индексы
      dragStartIndex = null
      dragOverIndex = null
    };
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
