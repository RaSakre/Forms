<template>
    <button  class="button" :class="[variant && `button--${variant}`]">
        <img class="btn-img" :src="img" v-if="img" alt="">
        {{ text }}
        </button>
</template>
<script setup lang="ts">
interface Props {
    text: string,
    variant?: string,
    img?: string,
}
const props = defineProps<Props>()
</script>
<style scoped>
    .button {
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    .button--orange {
        background-color: #ff9900;
        color: #fff;
    }
    .button--white {
        background-color: #fff;
        color: #000;
    }
    .button--dark {
        background-color: #171718;
        color: #fff;
    }
    .button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    .btn-img {
        width: 20px;
    }
</style>