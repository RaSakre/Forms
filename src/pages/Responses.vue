<template>
  <div class="container">
    <BackBtn :title="'Отклики'" />
    <div class="response">
      <div class="response__form-naming">
        <h2 class="form__title">{{ form?.name }}</h2>
        <p class="form__description">{{ form?.description }}</p>
      </div>
      <Tabs value="0">
        <TabList class="custom-tabs">
          <Tab value="0">
            <Icon :name="'table'" :color="'profile'" />
            Таблица
          </Tab>
          <Tab value="1">
            <Icon :name="'chart-pie'" :color="'profile'" />
            Аналитика
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div v-if="form?.answers" class="answers-table">
              <div v-for="(answer, question) in form?.answers" :key="question"  class="table-column">
                <div class="question-cell">{{ question }}</div>
                <div class="answer-cell">{{ Array.isArray(answer) ? answer.join(', ') : answer }}</div>
              </div>
              <div class="table-column">
                <div class="question-cell">Дата заполнения</div>
              <div class="answer-cell">{{ date}}</div>
              </div>
              
            </div>
            <p v-else>
              На данную форму ответов нет
            </p>
          </TabPanel>
          <TabPanel value="1">
            <PieChart :answers="form?.answers" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import PieChart from '@/components/UI/PieChart.vue';

import { useRoute } from 'vue-router';
import { useFormsStore } from '@/store/forms';
import { computed } from 'vue';

const route = useRoute();
const formsStore = useFormsStore()
const form = computed(() => {
  return formsStore.forms.find((form) => form.id === route.params.id)
})

const date = computed(() => {
  if (form.value?.updatedAt) {
    //@ts-ignore
    const timestampDate = form.value.updatedAt?.toDate()
    return timestampDate.toLocaleDateString('ru-RU') + ', ' +
      timestampDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
})

</script>
<style scoped>
.response {
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
}

.response__form-naming {
  text-align: center;
  margin-bottom: 25px;
}

.form__title {
  font-size: 24px;
  margin-bottom: 10px;
}

.form__description {
  font-size: 16px;
}

.custom-tabs {
  --p-tablist-border: 1px solid #e2e8f0;
  --p-tablist-padding: 0.5rem;
  --p-tab-gap: 0;
  margin-bottom: 20px;
}

.p-tablist {
  background-color: transparent;
}

.custom-tabs :deep(.p-tab) {
  padding: 12px 24px;
  color: #fff;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.custom-tabs :deep(.p-tab:hover) {
  color: #f97316;
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
  color: #ea580c;
}

.custom-tabs .p-tab:hover {
  color: #ea580c;
}

.custom-tabs :deep(.p-tab[aria-selected="true"]) {
  color: #ea580c;
  border-bottom-color: #ea580c;
}

.custom-tabs :deep(.p-tab .pi) {
  margin-right: 8px;
  font-size: 1rem;
}

.custom-tabs :deep(.p-tablist-tab-list) {
  border: none;
}

.answers-table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #e2e8f0;
}

.table-column {
  display: flex;
  flex-direction: column;
}

.question-cell {
  padding: 16px;
  background: #737475;
  color: #ffffff;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  min-height: 60px;
  display: flex;
  align-items: center;
}

.answer-cell {
  padding: 16px;
  background: #555353;
  color: #ffffff;
  height: 100%;
  display: flex;
  align-items: center;
}

</style>