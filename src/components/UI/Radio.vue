<template >
  <div style="position: relative; border-radius: 5px;">
    <input @change="emit('update:modelValue', value)" :name="name" type="radio" :value="value" :checked="checked">
  </div>
</template>
<script setup lang="ts">
interface IProps {
  value: string,
  modelValue: string,
  name: string,
  checked: boolean,
}
defineProps<IProps>()
const emit = defineEmits(['update:modelValue'])
</script>
<style scoped>
  
</style>