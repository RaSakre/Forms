<template>
    <header v-if="!authRoutes.includes(route.path)" class="header">
        <div class="container">
            <div class="header__content">
                <router-link to="/">
                    <h1 class="header__logo">Forms</h1>
                </router-link>
                <div class="header__right">
                    <nav>
                        <ul class="header__menu-list">
                            <li><router-link to="/">Главная</router-link></li>
                            <li><router-link to="/constructor">Новая форма</router-link></li>
                            <li><router-link :to="authStore.isAuth ? '/profile' : '/login'">{{ authStore.isAuth ? 'Профиль' : 'Войти'}}</router-link></li>
                        </ul>
                    </nav>
                    <button @click="changeTheme" class="theme">
                        <Icon :name="'sun'" style="color: var(--text-color);"/>
                        <p ref="themeText" style="color: var(--text-color);">{{ body.classList.contains('theme-light') ? 'Темная тема' : 'Светлая тема'}}</p>
                    </button>
                    <div class="header-user">
                        <router-link to="/profile">
                            <p v-if="authStore.isAuth">{{ authStore.userState.email }}</p>
                        </router-link>
                        <Icon v-if="authStore.isAuth" @click="logout" :name="'sign-out'" style="color: var(--text-color);  font-size: 16px;" />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useTemplateRef } from 'vue';
const route = useRoute()
const authStore = useAuthStore()
const authRoutes = ['/login', '/register', '/forgot-password']

const logout = () => {
    authStore.logout()
}

const themeText = useTemplateRef('themeText')

const body = document.querySelector('body')


const changeTheme = () => {
    body.classList.toggle('theme-light')
    themeText.value.textContent = body.classList.contains('theme-light') ? 'Темная тема' : 'Светлая тема'
}

</script>
<style scoped>
.header {
    padding: 10px 0px;
}

.header__content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header__content::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
}

.header__right {
    display: flex;
    align-items: center;
    gap: 25px;
}

.header__logo {
    font-size: 40px;
    color: orange;
    font-weight: 700;
}

.header__menu-list {
    display: flex;
    gap: 25px;
}

.header__menu-list a {
    color: var(--text-color);
}

.theme {
    display: flex;
    align-items: center;
    gap: 10px;
}

.theme img {
    width: 25px;
    object-fit: cover;
}

.header-user i {
    position: relative;
    top: 3px;
    object-fit: cover;
    cursor: pointer;
}

.header-user {
    display: flex;
    align-items: center;
    gap: 10px;
}

.header-user a {
    color: var(--text-color);
}
</style>