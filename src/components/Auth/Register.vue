<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-icon">
        <img src="/src/assets/auth/register-icon.svg" alt="" />
      </div>
      <div class="auth-text">
        <h2 class="auth-title">Регистрация</h2>
        <p>Зарегистрироваться с помощью почты</p>
      </div>
      <Form :onSubmit="register" :model="model" :rules="validationRules" v-slot="{ errors }">
        <FormField :error="errors.name" label="Имя">
          <Input v-model="model.name" placeholder="Имя" variant="gray" :icon="userIcon" />
        </FormField>
        <FormField label="Фамилия" :error="errors.surname">
          <Input v-model="model.surname" placeholder="Фамилия" variant="gray" :icon="userIcon" />
        </FormField>
        <FormField label="Почта" :error="errors.email">
          <Input v-model="model.email" placeholder="Введите почту" variant="gray" :icon="emailIcon" />
        </FormField>
        <FormField label="Пароль" :error="errors.password">
          <Input v-model="model.password" placeholder="Введите пароль" :type="'password'" variant="gray"
            :icon="passwordIcon" />
        </FormField>
        <FormField label="Повторите пароль" :error="errors.confirmPassword">
          <Input type="password" v-model="model.confirmPassword" placeholder="Повторите пароль" variant="gray"
            :icon="passwordIcon" />
        </FormField>
        <Button type="submit" style="width: 100%;" text="Зарегистрироваться" variant="orange" />
      </Form>
      <div class="register-footer">
        <Button @click.prevent="clearForm" text="Очистить форму" variant="white" />
        <p>
          Есть аккаунт?
          <button class="auth-footerBtn">
            <router-link to="/login">Войти</router-link>
          </button>
        </p>
      </div>
    </div>
    <Popup :show="showPopup" :text="popupText" :hasError="isError"/>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import emailIcon from '../../assets/auth/email.svg';
import passwordIcon from '../../assets/auth/lock.svg';
import userIcon from '../../assets/auth/user.svg';
import { ref } from 'vue';
import { Validators } from '../../utils/validator';
import { useRouter } from 'vue-router';
import type { IRegisterModel } from '@/types/formTypes';
import type { FirebaseError } from 'firebase/app';
import Button from '../UI/Button.vue';

const router = useRouter()

const authStore = useAuthStore()

let popupText = ref<string>('')
let showPopup = ref<boolean>(false)
let isError = ref<boolean>(false)

const register = () => {
  authStore.register(model.value)
  router.push('/login')
  
    .catch((err:FirebaseError) => {
      if (err.code === 'auth/email-already-in-use') {
        popupText.value = 'Пользователь с таким email уже существует'
      }
      if (err.code === 'auth/invalid-email') {
        popupText.value = 'Неверный формат email'
      }
      showPopup.value = true
      isError.value = true
      setTimeout(() => {
        showPopup.value = false
        popupText.value = ''
        isError.value = false
      },4000)
    })
};

const model = ref<IRegisterModel>({
  name: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const validationRules = {
  name: [Validators.required],
  surname: [Validators.required],
  email: [Validators.required, Validators.email],
  password: [Validators.required, Validators.minLength(6)],
  confirmPassword: [Validators.required, Validators.minLength(6), Validators.sameAs('password')],
};
const clearForm = () => {
  model.value = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
}
</script>

<style scoped>
form {
  margin-bottom: 20px;
}

.auth-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.auth {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  border: 1px solid gray;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 3px 11px 51px 7px rgba(34, 60, 80, 0.35);
}

.auth-icon {
  background: #272725;
  width: 45px;
  padding: 10px;
  border-radius: 10px;
  align-self: center;
  margin-bottom: 15px;
}

.auth-text {
  text-align: center;
  margin-bottom: 20px;
}

.auth-title {
  font-size: 30px;
  font-weight: 600;
  line-height: 100%;
  margin-bottom: 10px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.register-footer {
  display: flex;
  align-items: center;
  gap: 20px;
}

.auth-footerBtn {
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.auth-footerBtn a {
  color: inherit;
}

.auth-footerBtn:hover {
  color: orange;
}
</style>
