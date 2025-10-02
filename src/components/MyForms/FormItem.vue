<template>
  <li class="form-item">
    <router-link class="form-link" :to="`/form/${form.id}`">
      <h3 class="form__title">{{ form.name }}</h3>
      <p class="form-description">{{ form.description }}</p>
    </router-link>
    <div class="form-buttons">
      <button class="form-button">
        <Icon name="inbox" color="primary" />
      </button>
      <router-link
        class="form-button"
        :to="`/constructor/${form.id}`">
        <button>
          <Icon name="pencil" color="primary" />
        </button>
      </router-link>
      <button @click="deleteForm(form.id)" class="form-button">
        <Icon name="trash" color="error" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
  import type {IForm} from '@/types/formTypes';
  import {type PropType} from 'vue';
  import {useFormsStore} from '@/store/forms';
  const props = defineProps({
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
  });

  const formsStore = useFormsStore();

  const deleteForm = (id: string) => {
    if (!id) return;

    formsStore.deleteForm(id);
  };
</script>

<style scoped>
  .form-item {
    border: 1px solid gray;
    border-radius: 10px;
    text-align: center;
  }

  .form-item img {
    width: 20px;
  }

  .form__title {
    font-size: 20px;
    font-weight: normal;
    padding: 10px 0px;
    text-align: center;
  }

  .form-description {
    font-size: 16px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 10px 0px;
  }

  .form-buttons {
    display: flex;
    justify-content: space-around;
    padding: 15px 0px;
  }

  .form-button {
    position: relative;
  }

  .form-button:not(:last-child)::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: gray;
    right: -45px;
    top: 0;
  }
</style>
