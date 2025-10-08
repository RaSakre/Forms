<template>
  <div style="position: relative; border-radius: 5px">
    <input ref="passwordInput" :type="type" :placeholder="placeholder" :name="name" v-model="model" class="input"
      :style="[icon ? '' : 'padding: 10px']" :class="[variant && `input-${variant}`]" @blur="$emit('blur')" />
    <slot />
    <div class="input-img">
      <img :src="icon" alt="" />
    </div>
    <div v-if="type === 'password'" class="input-eye" @click="togglePasswordVisibility">
      <img :src="isPasswordVisible ? passwordEyeIconHide : passwordEyeIcon" alt="Toggle visibility" />
    </div>
  </div>
</template>
<script setup>
import passwordEyeIcon from '../../assets/auth/passwordEyeShow.svg';
import passwordEyeIconHide from '../../assets/auth/passwordEyeClose.svg';
import { ref } from 'vue';
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    required: false,
    default: '',
  },
  icon: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  value: [String, Number, Boolean],
});
const model = defineModel();
const emit = defineEmits(['blur', 'change']);
const passwordInput = ref(null);

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
  if (passwordInput.value) {
    passwordInput.value.type = isPasswordVisible.value ? 'text' : 'password';
  }
};
</script>

<style scoped>
.input-img {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
}

.input-eye {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
}

.input {
  width: 100%;
  padding: 10px 40px;
  background-color: #fff;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.input:hover {
  box-shadow: 0 0 0 1px #ffffff;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 1px rgb(252, 114, 1);
}

.input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px rgb(252, 114, 1);
}

.input-gray {
  background: rgb(91 87 87 / 40%);
  color: var(--text-color);
}

.input-gray::placeholder {
  color: rgba(var(--text-color));
  opacity: 0.3;
}
</style>
