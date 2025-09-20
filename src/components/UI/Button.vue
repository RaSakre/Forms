<template>
    <button  class="button" :class="[variant && `button--${variant}`]">{{ text }}</button>
</template>
<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true
        },
        variant: {
            type: String,
        }
    })
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
</style>