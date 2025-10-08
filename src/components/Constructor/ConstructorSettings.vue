<template>
  <div class="hero-section__constructor">
    <div class="constructor-tabs">
      <div class="tabs-item">
        <Icon :name="'home'" style="color: var(--text-color);" />
        <p>Конструктор</p>
      </div>
    </div>
    <h2 class="constructor-title">Элементы формы</h2>

    <div class="constructor-button" @click.prevent="addField('oneRow')">
      <Icon :name="'pencil'" style="color: var(--text-color); font-size: 16px;" />
      <p>Однострочный ответ</p>
    </div>
    <div class="constructor-button" @click.prevent="addField('multiRow')">
      <Icon :name="'align-left'" style="color: var(--text-color); font-size: 16px;" />
      <p>Многострочный ответ</p>
    </div>
    <div class="constructor-button" @click.prevent="addField('radio')">
      <Icon :name="'check-circle'" style="color: var(--text-color); font-size: 16px;" />
      <p>Список одиночного выбора</p>
    </div>
    <div class="constructor-button" @click.prevent="addField('checkbox')">
      <Icon :name="'list-check'" style="color: var(--text-color); font-size: 16px;" />
      <p>Список множественного выбора</p>
    </div>

    <div class="constructor-actions">
      <h3 class="action-title">Действия</h3>
      <div class="actions-buttons">
        <Button v-if="isEditing" :variant="'white'" :text="'Сохранить изменённую форму'" :isLoading="isLoading"
          @click.prevent="emit('on-edit')">
          <Icon :name="'save'" style="color: var(--button-text-color);" />
        </Button>
        <Button v-else-if="authStore.isAuth" :variant="'white'" :text="'Сохранить форму'" :isLoading="isLoading"
          @click.prevent="emit('on-save', formId)">
          <Icon :name="'save'" style="color: var(--button-text-color);" />
        </Button>
        <router-link style="color: white;" to="/login" v-else>Войдите, чтобы сохранять формы</router-link>
        <router-link v-if="formId" :to="`/form/${formId}`">
          <Button style="width: 100%" :variant="'gray'" :text="'Просмотр'" />
        </router-link>
        <Button v-if="isEditing" @click.prevent="emit('on-delete-form', formId)" style="width: 100%" :variant="'red'"
          :text="'Удалить форму'">
          <Icon :name="'trash'" style="color: rgba(216, 13, 13, 0.8);" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../UI/Button.vue';
import { OneRow, MultiRow, Radio, Checkbox } from '@/fields-objects/objects';
import type { IField } from '@/types/formTypes';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const props = defineProps({
  isEditing: {
    type: Boolean,
    required: false,
  },
  formId: {
    type: String,
    required: false,
  },
  isLoading: {
    type: Boolean,
    required: false,
  }
});

const fieldsMap: Record<string, IField> = {
  oneRow: new OneRow(),
  multiRow: new MultiRow(),
  radio: new Radio(),
  checkbox: new Checkbox(),
};

const emit = defineEmits(['on-add-field', 'on-delete-form', 'on-save', 'on-edit']);

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
