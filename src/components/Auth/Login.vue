<template>
    <div class="auth-wrapper">
        <div class="auth">
            <div class="auth-icon">
                <img src="/src/assets/auth/login-icon.svg" alt="">
            </div>
            <div class="auth-text">
                <h2 class="auth-title">Авторизация</h2>
                <p>Войти с помощью почты</p>
            </div>
            <form action="" class="login-form">
                <Input :type="'text'" :placeholder="'Введите почту'" :variant="'gray'" :image="emailIcon" />
                <Input :type="'password'" :placeholder="'Введите пароль'" :variant="'gray'" :image="passwordIcon" />
                <Button :text="'Войти'" :variant="'orange'" />
            </form>
            <div class="auth-footer">
                <p>Забыли пароль? <button class="auth-footerBtn">Сбросить</button></p>
                <p>Нет аккаунта? <button class="auth-footerBtn">Зарегистрироваться</button></p>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import Input from '../UI/Input.vue';
import Button from '../UI/Button.vue'
import emailIcon from '../../assets/auth/email.svg'
import passwordIcon from '../../assets/auth/lock.svg'

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