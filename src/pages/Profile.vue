<template>
  <div class="profile">
    <div class="container">
      <BackBtn :title="'Мой профиль'" />
      <div class="profile__content">
        <div class="profile__left">
          <div class="avatar-wrapper">
            <div class="avatar">
              <img src="../assets/User-avatar.svg.png" alt="Avatar">
            </div>
          </div>
          <div class="profile__data">
            <h3 v-if="!isEditing" class="profile__name">{{ name }}</h3>
            <ProfileForm :date="date" :email="email" :is-editing="isEditing" :local-user-data="localUserData"
              @confirm-changes="submit" @edit-mode="isEditing = !isEditing" v-if="isEditing" />
            <div v-if="!isEditing" class="data-wrapper">
              <div class="data">
                <Icon :name="'at'" style="color: var(--textcolor);"/>
                <span>{{ email }}</span>
              </div>
              <div class="data">
                <Icon :name="'clipboard'" style="color: var(--textcolor);"/>
                <span>Количество созданных форм {{ formsStore.forms.length }}</span>
              </div>
              <div class="data">
                <Icon :name="'calendar'" style="color: var(--textcolor);"/>
                <span>Дата регистрации: {{ date }}</span>
              </div>
            </div>
          </div>
          <Icon :name="'user-edit'" style="color: var(--text-color); font-size: 30px;" @click="isEditing = !isEditing" v-if="!isEditing" 
            class="profile-edit"/>
        </div>
        <router-link to="/reset-password" class="profile__resetpass">
          <button class="reset-btn">
            <p style="color: var(--text-color);">Изменить пароль</p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useFormsStore } from '@/store/forms';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProfileForm from '@/components/ProfileForm.vue';

const router = useRouter()
const authStore = useAuthStore();
const formsStore = useFormsStore();
const isEditing = ref<boolean>(false)

let localUserData = ref({
  firstName: '',
  lastName: '',
  email: '',
})

const submit = () => {
  if (hasChanges()) {
    authStore.updateUserData(localUserData.value)
    isEditing.value = !isEditing.value
  }
  else {
    isEditing.value = !isEditing.value
  }
}

watch(() => authStore.userData, (newVal) => {
  if (newVal) {
    localUserData.value = { ...newVal }
  }
  if (newVal === null) {
    router.push('/')
  }
}, { immediate: true })


const hasChanges = () => {
  if (localUserData.value.firstName !== authStore.userData?.firstName || localUserData.value.lastName !== authStore.userData?.lastName) {
    return true
  } else {
    return false
  }
}


const name = computed(() => {
  if (authStore.userData?.firstName || authStore.userData?.lastName) {
    return authStore.userData.firstName + ' ' + authStore.userData.lastName
  }
})

const email = computed(() => {
  if (authStore.userData?.email) {
    return authStore.userData.email
  }
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


.reset-btn a {
  color: inherit;
  font-size: 18px;
}

.inputs-name {
  margin-bottom: 20px;
}

.inputs-name div:not(:last-child) {
  margin-bottom: 15px;
}
</style>