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
      <!-- <form class="register-form" action="">
        <Input :type="'text'" :placeholder="'Имя'" :variant="'gray'" :image="userIcon" />
        <Input :type="'text'" :placeholder="'Фамилия'" :variant="'gray'" :image="userIcon" />
        <Input :type="'email'" :placeholder="'Введите почту'" :variant="'gray'" :image="emailIcon" />
        <Input :type="'password'" :placeholder="'Введите пароль'" :variant="'gray'" :image="passwordIcon" />
        <Input :type="'password'" :placeholder="'Повторите пароль'" :variant="'gray'" :image="passwordIcon" />
        <Button :text="'Зарегистрироваться'" :variant="'orange'" />
      </form> -->
      <Form :onSubmit="register" :model="model" :rules="validationRules" v-slot="{errors}">
        <FormField label="Имя" :error="errors.name">
          <Input v-model="model.name" placeholder="Имя" variant="gray" :image="userIcon" />
        </FormField>
        <FormField label="Фамилия" :error="errors.surname">
          <Input v-model="model.surname" placeholder="Фамилия" variant="gray" :image="userIcon" />
        </FormField>
        <FormField label="Почта" :error="errors.email">
          <Input v-model="model.email" placeholder="Введите почту" variant="gray" :image="emailIcon" />
        </FormField>
        <FormField label="Пароль" :error="errors.password">
          <Input v-model="model.password" placeholder="Введите пароль" variant="gray" :image="passwordIcon" />
        </FormField>
        <FormField label="Повторите пароль" :error="errors.confirmPassword">
          <Input
            type="password"
            v-model="model.confirmPassword"
            placeholder="Повторите пароль"
            variant="gray"
            :image="passwordIcon" />
        </FormField>
        <Button text="Зарегистрироваться" variant="orange" />
      </Form>
      <div class="register-footer">
        <Button text="Очистить форму" variant="white" />
        <p>
          Есть аккаунт?
          <button class="auth-footerBtn">Войти</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Form from '../UI/Form.vue';
  import FormField from '../UI/FormField.vue';
  import Input from '../UI/Input.vue';
  import Button from '../UI/Button.vue';
  import emailIcon from '../../assets/auth/email.svg';
  import passwordIcon from '../../assets/auth/lock.svg';
  import userIcon from '../../assets/auth/user.svg';
  import {ref} from 'vue';
  import {Validators} from '../../utils/validator';

  const register = () => {
    console.log('register');
  };

  interface IRegisterModel {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

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

  .auth-footerBtn:hover {
    color: orange;
  }
</style>
