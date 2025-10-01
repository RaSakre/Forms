<template>
  <div class="form-field">
    <label v-if="label" class="form-field-label">
      {{ label }}
    </label>
    <slot />
    <Transition name="fade">
      <div v-if="error" class="form-field-error">
        {{ error }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
  });
</script>

<style scoped>
  .form-field {
    margin-bottom: 24px;
    position: relative;
  }

  .form-field-error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    position: absolute;
    left: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    bottom: -10px;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    bottom: -20px;
  }
</style>
