<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useFormsStore } from './store/forms';
import Layout from './Layout/Layout.vue';

const formsStore = useFormsStore();

onMounted(() => {
    formsStore.initRealtimeListener(); 
});

onUnmounted(() => {
    formsStore.stopRealtimeUpdates(); 
});

</script>

<template>
<Layout/>
</template>
