<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-icon">
        <img src="/src/assets/auth/login-icon.svg" alt="" />
      </div>
      <div class="auth-text">
        <h2 class="auth-title">Авторизация</h2>
        <p>Войти с помощью почты</p>
      </div>
      <Form :onSubmit="login" :model="model" :rules="validationRules" v-slot="{errors}">
        <FormField :error="errors.email">
          <Input v-model="model.email" placeholder="Введите почту" variant="gray" :icon="emailIcon" />
        </FormField>
        <FormField :error="errors.password">
          <Input v-model="model.password" :type="'password'" placeholder="Введите пароль" variant="gray" :icon="passwordIcon" />
        </FormField>
        <div class="auth-footer">
          <Button text="Войти" variant="orange" />
          <div class="auth-footerBtns">
            <p>
          Забыли пароль?
          <button class="auth-footerBtn">
            <router-link to="/reset-password" >Восстановить</router-link>
          </button>
        </p>
        <p>
          Нет аккаунта?
          <button class="auth-footerBtn">
            <router-link to="/register" >Зарегистрироваться</router-link>
          </button>
        </p>
          </div>
        
      </div>

      </Form>
      
    </div>
    <Popup :show="showPopup" :text="errorText" :hasError="isError" />
  </div>
</template>
<script setup lang="ts">
  import { useAuthStore } from '@/store/auth';
  import Button from '../UI/Button.vue';
  import emailIcon from '@/assets/auth/email.svg'
  import passwordIcon from '@/assets/auth/lock.svg';
  import {ref} from 'vue';
  import {Validators} from '../../utils/validator';
  import { useRouter } from 'vue-router';

  const router = useRouter()

  const authStore = useAuthStore()
  let errorText = ref<string>('')
  let showPopup = ref<boolean>(false)
  let isError = ref<boolean>(false)

  interface ILoginModel {
    email: string;
    password: string;
  }

  const model = ref<ILoginModel>({
    email: '',
    password: '',
  });

  const validationRules = {
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.minLength(6)],
  };

  const login = () => {
    authStore.login(model.value.email, model.value.password)
    .then(() => {
      if (authStore.userState) {
        router.push('/')
      }
    })
    .catch((error) => {
      errorText.value = 'Неправильные данные входа'
      showPopup.value = true
      isError.value = true
      setTimeout(() => {
        showPopup.value = false
        errorText.value = ''
        isError.value = false
      }, 4000)
    })
  };
</script>
<style scoped>
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
    width: 50px;
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

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }

  .auth-footer {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .auth-footerBtns {
    align-self: flex-end;
  }

  .auth-footer p:not(:last-child) {
    margin-bottom: 10px;
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
