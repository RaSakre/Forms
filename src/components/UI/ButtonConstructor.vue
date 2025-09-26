<template >
    <button class="constructor-button" @click.prevent="emit('addQuestion')">
        <img style="width: 20px;" :src="image" alt="">
    <p>{{ text }}</p>
    </button>
    
</template>
<script setup lang="ts">
const emit = defineEmits(['addQuestion'])
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    
})
</script>
<style scoped>
    
</style>