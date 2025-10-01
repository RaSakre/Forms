<template>

  <div class="container">
    <h2 class="my-forms-title">Мои формы</h2>
    <div class="my-forms">
      <div class="filters-form">
        <Input v-model="searchQuery" class="search" variant="gray" :placeholder="'Найти'">
          <img class="search-icon" src="../assets/search.svg" alt="" />
        </Input>
        <select v-model="sortKey" class="custom-select">
          <option value="new" selected>Сначала новые</option>
          <option value="old">Сначала старые</option>
          <option value="a-z">Порядок А-Я</option>
          <option value="z-a">Порядок Я-А</option>
        </select>
      </div>

      <FormsList :forms="sortedForms" />

    <div class="container">
        <h2 class="my-forms-title">Мои формы</h2>
        <div class="my-forms">
            <div class="filters-form">
                <Input v-model="inputSearchForm" @update:modelValue="find(inputSearchForm)" class="search"
                    :variant="'gray'" :type="'text'" :placeholder="'Найти'">
                <img class="search-icon" src="../assets/search.svg" alt="">
                </Input>
                <select @change="sortBy" v-model="option" class="custom-select">
                    <option value="new" selected>Сначала новые</option>
                    <option value="old">Сначала старые</option>
                    <option value="a-z">Порядок А-Я</option>
                    <option value="z-a">Порядок Я-А</option>
                </select>
            </div>

            <ul v-if="formsStore.forms.length" class="forms-list">
                <li v-for="form in formsStore.forms" :key="form.id" class="form-item">
                    <router-link class="form-link" :to='`/form/${form.id}`'>
                        <h3 class="form-title">{{ form.name }}</h3>
                        <p class="form-description">{{ form.description }}</p>
                    </router-link>
                    <div class="form-buttons">
                        <button class="form-button">
                            <img :src="msgs" alt="">
                        </button>
                        <router-link class="form-button" :to="`/constructor/${form.id}`">
                            <button>
                                <img :src="pen" alt="">
                            </button>
                        </router-link>
                        <button @click="form.id ? formsStore.deleteForm(form.id) : ''" class="form-button">
                            <img :src="thrash" alt="">
                        </button>
                    </div>
                </li>
            </ul>
            <!-- <p style="font-size: 20px;" v-else>Формы не найдены</p> -->
        </div>

    </div>
  </div>
</template>
<script setup lang="ts">
  import FormsList from '@/components/MyForms/FormsList.vue';

  import {useFormsStore} from '@/store/forms';
  import {ref, computed} from 'vue';
  import type {IForm} from '@/types/formTypes';

  const formsStore = useFormsStore();

  // поиск
  const searchQuery = ref<string>('');

  // сортировка
  const sortKey = ref<string>('new');
  const sortVariants: Record<string, (a: IForm, b: IForm) => number> = {
    new: (a: IForm, b: IForm) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
    old: (a: IForm, b: IForm) => (a.createdAt ?? 0) - (b.createdAt ?? 0),
    'a-z': (a: IForm, b: IForm) => (a.name ?? '').localeCompare(b.name ?? ''),
    'z-a': (a: IForm, b: IForm) => (b.name ?? '').localeCompare(a.name ?? ''),
  };

  // отсортированные формы
  const sortedForms = computed(() => {
    const list = [...formsStore.forms];

    // сортировка
    list.sort(sortVariants[sortKey.value]);

    // фильтрация
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
    top: 10px;
  }

  .form-link {
    color: white;
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
    width: 200px;
    padding: 10px 35px 10px 15px;
    font-size: 14px;
    color: #fff;
    height: 100%;
    background-color: #333;
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
  }

  .custom-select option {
    background-color: #666;
    color: #fff;
    padding: 10px;
  }

  .custom-select:hover {
    background-color: #3a3a3a;
  }

  .custom-select:focus {
    outline: none;
    border-color: #777;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
</style>
