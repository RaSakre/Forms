<template>
  <form @submit.prevent="handleSubmit">
    <slot :errors="errors" />
  </form>
</template>

<script setup lang="ts">
  import {reactive} from 'vue';

  const props = defineProps({
    onSubmit: {
      type: Function,
      required: true,
    },
    rules: {
      type: Object,
      required: false,
    },
    model: {
      type: Object,
      required: true,
    },
  });

  const errors = reactive<Record<string, string>>({});

  // const model = ref<IRegisterModel>({
  //   name: '',
  //   surname: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  // const rules = {
  //   name: [Validators.required],
  //   surname: [Validators.required],
  //   email: [Validators.required, Validators.email],
  //   password: [Validators.required, Validators.minLength(6)],
  //   confirmPassword: [Validators.required, Validators.minLength(6), Validators.sameAs('password')],
  // };

  const validate = () => {
    Object.keys(errors).forEach((k) => delete errors[k]); // очищаем ошибки

    if (props.rules) {
      for (const key in props.rules) {
        const rulesValue = props.rules[key];
        const modelValue = props.model[key];

        for (const ruleFn of rulesValue) {
          const result = ruleFn(modelValue, props.model);
          if (result !== true) {
            errors[key] = result as string;
            break; // берём первую ошибку
          }
        }
      }
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      props.onSubmit(props.model);
    }
  };

  defineExpose({
    validate,
    errors,
  });
</script>
