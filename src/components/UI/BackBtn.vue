<template>
  <button @click="router.push('/')" class="back-btn">
    Назад
    <img src="../../assets/constructor/constructor-arrow-back.svg" alt="" />
  </button>
  <h1 class="title">{{ title }}</h1>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  }
})
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<style scoped>
  .title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .back-btn {
      display: flex;
      color: rgb(252, 114, 1);
      flex-direction: row-reverse;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
  }
  
  .back-btn img {
      width: 30px;
  }
</style>