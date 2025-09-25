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
                        <li><router-link to="/" >Главная</router-link></li>
                        <li><router-link to="/constructor">Новая форма</router-link></li>
                        <li>Профиль</li>
                    </ul>
                </nav>
                <div class="theme">
                    <img src="../assets/Header/sun.svg" alt="">
                    <p>Светлая тема</p>
                </div>
                <div class="header-exit">
                    <img src="../assets/Header/exit.svg" alt="">
                </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
const authRoutes = ['/login', '/register', '/forgot-password']
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
    color: white;
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

.header-exit img {
    width: 20px;
    object-fit: cover;
}
</style>