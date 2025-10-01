import Constructor from '../pages/Constructor.vue';
import Form from '@/pages/Form.vue';
import MyForms from '@/pages/MyForms.vue';
import Login from '@/components/Auth/Login.vue';
import Register from '@/components/Auth/Register.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {path: '/constructor', component: Constructor},
  {path: '/constructor/:formId', component: Constructor, name: 'constructor'},
  {path: '/form/:id', component: Form},
  {path: '/', component: MyForms},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
