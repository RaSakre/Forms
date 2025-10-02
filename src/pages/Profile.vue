<template>
  <div class="profile">
    <div class="container">
      <button @click="router.push('/')" class="back-btn">
        Назад
        <img src="../assets/constructor/constructor-arrow-back.svg" alt="" />
      </button>
      <h2 class="profile__title">Мой профиль</h2>
      <div class="profile__content">
        <div class="profile__left">
          <div class="avatar-wrapper">
            <div class="avatar">
              <img src="../assets/User-avatar.svg.png" alt="Avatar">
            </div>
          </div>
          <div class="profile__data">
            <h3 class="profile__name">{{ name }}</h3>
            <div class="data-wrapper">
              <div class="data">
                <Icon :name="'at'" />
                <span>{{ email }}</span>
              </div>
              <div class="data">
                <Icon :name="'clipboard'" />
                <span>Количество созданных форм {{ formsStore.forms.length }}</span>
              </div>
              <div class="data">
                <Icon :name="'calendar'" />
                <span>Дата регистрации: {{ date }}</span>
              </div>
            </div>
          </div>
          <img src="../assets/constructor/constructor-pen.svg" alt="" class="profile-edit">
        </div>
        <div class="profile__resetpass">
          <button class="reset-btn">
            <router-link to="/reset-password">Изменить пароль</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useFormsStore } from '@/store/forms';
import { computed } from 'vue';

const authStore = useAuthStore();
const formsStore = useFormsStore();
const router = useRouter();

const name = computed(() => {
  return authStore.userData ? authStore.userData.firstName + ' ' + authStore.userData.lastName : ''
})

const email = computed(() => {
  return authStore.userData ? authStore.userData.email : ''
})

const date = computed(() => {
  if (!authStore.userData?.createdAt) return ''
  else {
    const timestampDate = authStore.userData.createdAt.toDate();
    const formatted = timestampDate.toLocaleDateString('ru-RU') + ', ' +
      timestampDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return formatted
  }

});
</script>
<style scoped>
.profile__title {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
}

.profile__content {
  display: flex;
  gap: 20px;
}

.profile__left {
  position: relative;
  border: 1px solid gray;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0px 7px 8px 0px rgba(170, 173, 176, 0.2);
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  border: 1px solid #aca9a9;
  border-radius: 50%;
}

.avatar img {
  width: 100px;
}

.profile__name {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
}

.data {
  display: flex;
  gap: 10px;
  align-items: center;
}

.data-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.profile-edit {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  cursor: pointer;
}

.profile__resetpass {
  display: flex;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 10px;
  align-self: flex-start;
  min-height: 70px;
  width: 100%;
  box-shadow: 0px 7px 8px 0px rgba(170, 173, 176, 0.2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.profile__resetpass:hover {
  background-color: rgb(196, 133, 18);
  transform: scaleY(1.05) translateY(-5px);
}


.reset-btn a{
  color: inherit;
  font-size: 18px;
}
</style>