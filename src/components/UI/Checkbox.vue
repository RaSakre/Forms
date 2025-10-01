<template lang="">
  <div style="position: relative; border-radius: 5px">
    <input @change="emit('update:modelValue', value)" :name="name" type="checkbox" :value="value" />
  </div>
</template>
<script setup lang="ts">
  interface IProps {
    value: string;
    modelValue: string;
    name: string;
  }
  defineProps<IProps>();
  const emit = defineEmits(['update:modelValue']);
</script>
<style scoped></style>
