<template>
    <div class="container">
        <h2 class="my-forms-title">Мои формы</h2>
        <div class="my-forms">
            <Input class="search" :variant="'gray'" :type="'text'" :placeholder="'Найти'">
            <img class="search-icon" src="../assets/search.svg" alt="">
            </Input>
            <ul v-if="formsStore.forms.length" class="forms-list">
                <li v-for="form in formsStore.forms" :key="form.id" class="form-item">
                    <router-link class="form-link" :to='`/form/${form.id}`'>
                    <h3 class="form-title">{{ form.name}}</h3>
                    <p class="form-description">{{form.description}}</p>
                    </router-link>
                    <div class="form-buttons">
                        <button class="form-button">
                            <img :src="msgs" alt="">
                        </button>
                        <button  class="form-button">
                            <img :src="pen" alt="">
                        </button>
                        <button @click="form.id ? formsStore.deleteForm(form.id) : ''" class="form-button">
                            <img :src="thrash" alt="">
                        </button>
                    </div>
                </li>
            </ul>
            <p style="font-size: 20px;" v-else>Формы не найдены</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import Input from '@/components/UI/Input.vue';
import msgs from '@/assets/index-msgs.svg'
import pen from '@/assets/index-pen.svg'
import thrash from '@/assets/index-thrash.svg'

import { useFormsStore } from '@/store/forms';

const formsStore = useFormsStore()



</script>
<style scoped>
.search-icon {
    position: absolute;
    width: 20px;
    right: 10px;
    top: 8px;
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


</style>