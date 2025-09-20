<template>
    <Header />
    <main>
        <router-view />
    </main>
    <Footer />
</template>
<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>
<style scoped></style>