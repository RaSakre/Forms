<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useFormsStore } from './store/forms';
    import Layout from './Layout/Layout.vue';
    import { useRouter } from 'vue-router';

    const formsStore = useFormsStore();
    const router = useRouter();

    onMounted(() => {
        const token = localStorage.getItem('token')
        formsStore.initRealtimeListener()
        if (!token) {
            router.push('/login')
        }
    });



</script>

<template>
    <Layout />
</template>