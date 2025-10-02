<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-icon">
        <Icon :name="'replay'"/>
      </div>
      <div class="auth-text">
        <h2 class="auth-title">Сброс пароля</h2>
        <p>Введите почту, на которую будет отправлено письмо для сброса пароля</p>
      </div>
      <Form :onSubmit="onSubmit" :model="model" :rules="validationRules" v-slot="{errors}">
        <FormField :error="errors.email">
          <Input v-model="model.email" placeholder="Введите почту" variant="gray" :icon="emailIcon" />
        </FormField>

        
        <div class="auth-footer">
          <Button text="Сбросить пароль" variant="orange" />
          <div class="auth-footerBtns">
          <button class="auth-footerBtn">
            <router-link to="login" >На страницу входа</router-link>
          </button>
          </div>
        
      </div>
      </Form>
      
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import emailIcon from '@/assets/auth/email.svg'
import { Validators } from '@/utils/validator';
  interface IResetPassModel {
    email: string;
  }

  const model = ref<IResetPassModel>({
    email: '',
  });

    const validationRules = {
    email: [Validators.required, Validators.email],
  };

  const onSubmit = () => {
    console.log('reset pass')
  }
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