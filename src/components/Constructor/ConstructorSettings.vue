<template>
  <div class="hero-section__constructor">
    <div class="constructor-tabs">
      <div class="tabs-item">
        <img src="../assets/constructor/constructor-house.svg" alt="" />
        <p>Конструктор</p>
      </div>
      <div class="tabs-item">
        <img src="../assets/constructor/constructor-settings.svg" alt="" />
        <p>Настройки</p>
      </div>
    </div>
    <h2 class="constructor-title">Элементы формы</h2>

    <div class="constructor-button" @click.prevent="addField('oneRow')">
      <img style="width: 20px" :src="pencil" alt="" />
      <p>Однострочный ответ</p>
    </div>
    <div class="constructor-button" @click.prevent="addField('multiRow')">
      <img style="width: 20px" :src="lines" alt="" />
      <p>Многострочный ответ</p>
    </div>
    <div class="constructor-button" @click.prevent="addField('radio')">
      <img style="width: 20px" :src="singleSelect" alt="" />
      <p>Список одиночного выбора</p>
    </div>
    <div class="constructor-button" @click.prevent="addField('checkbox')">
      <img style="width: 20px" :src="multiSelect" alt="" />
      <p>Список множественного выбора</p>
    </div>

    <div class="constructor-actions">
      <h3 class="action-title">Действия</h3>
      <div class="actions-buttons">
        <Button
          v-if="isEditing"
          :variant="'white'"
          :text="'Сохранить изменённую форму'"
          @click.prevent="emit('on-save', formId)"
          :img="saveIcon" />
        <Button v-else :variant="'white'" :text="'Сохранить форму'" type="submit" :img="saveIcon" />
        <router-link v-if="formId" :to="`/form/${formId}`">
          <Button style="width: 100%" :variant="'gray'" :text="'Просмотр'" />
        </router-link>

        <Button
          v-if="isEditing"
          @click.prevent="emit('on-delete-form', formId)"
          :img="deleteFormIcon"
          style="width: 100%"
          :variant="'red'"
          :text="'Удалить форму'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Button from '../UI/Button.vue';
  import {OneRow, MultiRow, Radio, Checkbox} from '@/fields-objects/objects';
  import saveIcon from '@/assets/constructor/constructor-save.svg';
  import lines from '@/assets/constructor/constructor-lines.svg';
  import pencil from '@/assets/constructor/constructor-pen.svg';
  import singleSelect from '@/assets/constructor/constructor-check.svg';
  import multiSelect from '@/assets/constructor/constructor-plus.svg';
  import deleteFormIcon from '@/assets/index-thrash.svg';
  import type {IField} from '@/types/formTypes';

  const props = defineProps({
    isEditing: {
      type: Boolean,
      required: false,
    },
    formId: {
      type: String,
      required: false,
    },
  });

  const fieldsMap: Record<string, IField> = {
    oneRow: new OneRow(),
    multiRow: new MultiRow(),
    radio: new Radio(),
    checkbox: new Checkbox(),
  };

  const emit = defineEmits(['on-add-field', 'on-delete-form', 'on-save']);

  const addField = (field: string) => {
    emit('on-add-field', fieldsMap[field]);
  };
</script>

<style>
  .constructor-button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid gray;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 10px;
    width: 100%;
    background-color: rgb(128 128 128 / 30%);
  }

  .constructor-button:hover {
    background-color: rgb(128 128 128 / 40%);
  }
</style>
