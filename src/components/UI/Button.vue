<template>
    <button class="button" :class="[variant && `button--${variant}`]">
        <slot v-if="!isLoading"/>
        <Loader v-if="isLoading" />
        {{ text }}
        
    </button>
</template>
<script setup lang="ts">
interface Props {
    text: string,
    variant?: string,
    img?: string,
    isLoading?: boolean;
}
const props = defineProps<Props>()
import Loader from './Loader.vue';
</script>
<style scoped>
.button {
    display: flex;
    justify-content: center;
    gap: 10px;
    outline: none;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.button--orange {
    background-color: #ff9900;
    color: #fff;
}

.button--white {
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
}

.button--gray {
    background-color: #363638;
    color: #fff;
}

.button--gray:hover {
    outline: 1px solid rgb(252, 114, 1);
}

.button--red {
    background-color: rgba(216, 13, 13, 0.3);
    color: rgba(216, 13, 13, 0.8);
}

.button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.btn-img {
    width: 20px;
}
</style>