<template>
  <Form :model="localUserData" v-if="isEditing" :onSubmit="submitChanges">
    <FormField label="Имя">
      <Input :type="'text'" :variant="'gray'" :icon="userIcon" :placeholder="'Имя'" v-model="localUserData.firstName" />
    </FormField>
    <FormField label="Фамилия">
      <Input :type="'text'" :variant="'gray'" :icon="userIcon" :placeholder="'Имя'" v-model="localUserData.lastName" />
    </FormField>
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
    <Button @click.prevent="emit('editMode')" style="width: 100%;" :variant="'red'" :text="'Отменить изменения'" :img="deleteIcon"/>
    <button type="submit" class="profile-edit">
      <img  :src="isEditing ?  confirmEdit : ''" alt="" >
    </button>
  </Form>
</template>
<script setup lang="ts">
const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  localUserData: {
    type: Object,
    required: true
  }
})
import { useFormsStore } from '@/store/forms'
import userIcon from '@/assets/auth/user.svg'
import confirmEdit from '@/assets/edit-checkmark.svg'
import deleteIcon from '@/assets/delete.svg'
const formsStore = useFormsStore()
const emit = defineEmits(['submitChanges', 'editMode', 'confirmChanges'])

const submitChanges = () => {
  emit('confirmChanges')
}

</script>
<style scoped>
.profile-edit {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  cursor: pointer;
}

.data-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.data {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>