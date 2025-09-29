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
          <Input v-model="model.email" placeholder="Введите почту" variant="gray" :image="emailIcon" />
        </FormField>
        <FormField :error="errors.password">
          <Input v-model="model.password" placeholder="Введите пароль" variant="gray" :image="passwordIcon" />
        </FormField>

        <Button text="Войти" variant="orange" />
      </Form>
      <div class="auth-footer">
        <p>
          Забыли пароль?
          <button class="auth-footerBtn">Сбросить</button>
        </p>
        <p>
          Нет аккаунта?
          <button class="auth-footerBtn">Зарегистрироваться</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Form from '../UI/Form.vue';
  import FormField from '../UI/FormField.vue';
  import Button from '../UI/Button.vue';
  import {ref} from 'vue';
  import {Validators} from '../../utils/validator';

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
    console.log('login');
  };
</script>
<style scoped>
  .auth-wrapper {
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

  .auth-footerBtn:hover {
    color: orange;
  }
</style>
