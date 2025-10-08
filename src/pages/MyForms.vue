<template>
  <div class="container">
    <h2 class="my-forms-title">Мои формы</h2>
    <div class="my-forms">
      <div class="filters-form">
        <Input v-model="searchQuery" class="search" variant="gray" :placeholder="'Найти'">
        <Icon :name="'search'" style="color: var(--text-color); font-size: 16px;" class="search-icon"/>
        </Input>
        <select v-model="sortKey" class="custom-select">
          <option value="new" selected>Сначала новые</option>
          <option value="old">Сначала старые</option>
          <option value="a-z">Порядок А-Я</option>
          <option value="z-a">Порядок Я-А</option>
        </select>
      </div>
      <FormsList :forms="sortedForms" />
    </div>
  </div>
</template>
<script setup lang="ts">
import FormsList from '@/components/MyForms/FormsList.vue';

import { useFormsStore } from '@/store/forms';
import { ref, computed } from 'vue';
import type { IForm } from '@/types/formTypes';

const formsStore = useFormsStore();
const searchQuery = ref<string>('');

const sortKey = ref<string>('new');
const sortVariants: Record<string, (a: IForm, b: IForm) => number> = {
  new: (a: IForm, b: IForm) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
  old: (a: IForm, b: IForm) => (a.createdAt ?? 0) - (b.createdAt ?? 0),
  'a-z': (a: IForm, b: IForm) => (a.name ?? '').localeCompare(b.name ?? ''),
  'z-a': (a: IForm, b: IForm) => (b.name ?? '').localeCompare(a.name ?? ''),
};

const sortedForms = computed(() => {
  const list = [...formsStore.forms];

  list.sort(sortVariants[sortKey.value]);

  if (searchQuery.value) {
    return list.filter((form) => form.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  return list;
});
</script>
<style>
.search-icon {
  position: absolute;
  width: 20px;
  right: 10px;
  top: 11px;
}

.form-link {
  color: var(--text-color);
}

.my-forms-title {
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 20px;
}

.my-forms {
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
}

.search {
  max-width: 350px;
  width: 100%;
  margin-bottom: 30px;
}

.filters-form {
  display: flex;
  justify-content: space-between;
}

.custom-select {
  position: relative;
  width: 200px;
  padding: 10px 35px 10px 15px;
  font-size: 14px;
  color: var(--text-color);
  height: 100%;
  background-color: var(--bg-color);
  border: 1px solid #555;
  border-radius: 5px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('../assets/down-arrow.svg');
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
  transition: background-color 0.3s ease-in-out;
}

.icon-filter {
  position: absolute;
  right: 10px;
  top: 11px;
}

.custom-select option {
  background-color: #666;
  color: #fff;
  padding: 10px;
}

.custom-select:hover {
  background-color: #c4bfbf;
}

.custom-select:focus {
  outline: none;
  border-color: #777;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}
</style>
