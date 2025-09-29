<template>
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
</template>
<script setup lang="ts">
import Input from '@/components/UI/Input.vue';
import msgs from '@/assets/index-msgs.svg'
import pen from '@/assets/index-pen.svg'
import thrash from '@/assets/index-thrash.svg'

import { useFormsStore } from '@/store/forms';
import { ref } from 'vue';

const inputSearchForm = ref<string>('')
const formsStore = useFormsStore()

const find = (input: string) => {
    formsStore.findForm(input)
}

const option = ref<string>('new')

const sortBy = () => {
    formsStore.sortByValue(option.value)
}



</script>
<style scoped>
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

.forms-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
}

.form-item {
    border: 1px solid gray;
    border-radius: 10px;
    text-align: center;
}

.form-item img {
    width: 20px;
}

.form-title {
    font-size: 20px;
    font-weight: normal;
    padding: 10px 0px;
}

.form-description {
    font-size: 16px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 10px 0px;
}

.form-buttons {
    display: flex;
    justify-content: space-around;
    padding: 15px 0px;
}

.form-button {
    position: relative;
}

.form-button:not(:last-child)::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: gray;
    right: -45px;
    top: 0;
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
    background-image: url("../assets/down-arrow.svg");
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