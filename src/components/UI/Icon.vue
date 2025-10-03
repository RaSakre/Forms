<template>
  <i :class="[`pi pi-${props.name}`, props.color && `pi-${props.color}`]"></i>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
  const props = withDefaults(
    defineProps<{
      name: string;
      color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'help';
    }>(),
    {
      color: 'primary',
    }
  );
</script>

<style scoped>
  i {
    font-size: 20px;
  }


  i.pi-primary {
    color: #ffffff;
  }

  i.pi-secondary {
    color: #6c757d;
  }

  i.pi-success {
    color: #28a745;
  }

  i.pi-profile:hover {
    color: #ea580c;
  }

  i.pi-warning {
    color: #ffc107;
  }

  i.pi-error {
    color: #dc3545;
  }
</style>
