<script setup lang="ts">
import { onMounted} from 'vue';
import { useFormsStore } from './store/forms';
import { useAuthStore } from './store/auth';
import Layout from './Layout/Layout.vue';
import { useRouter } from 'vue-router';

const formsStore = useFormsStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
    formsStore.initRealtimeListener()
});



</script>

<template>
<Layout/>
</template>
