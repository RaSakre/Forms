import { createApp } from 'vue'
import './style.css'
import 'primeicons/primeicons.css'
import Icon from './components/UI/Icon.vue'
import Input from './components/UI/Input.vue'
import Button from './components/UI/Button.vue'
import Form from './components/UI/Form.vue'
import FormField from './components/UI/FormField.vue'
import BackBtn from './components/UI/BackBtn.vue'
import PrimeVue from 'primevue/config';


import App from './App.vue'
import router from './routes/route'
import { createPinia } from 'pinia'



const pinia = createPinia()

const app = createApp(App).use(pinia).use(router).use(PrimeVue, {
  theme: {
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
});

app.component('Icon', Icon)
app.component('Input', Input)
app.component('Button', Button)
app.component('Form', Form)
app.component('FormField', FormField)
app.component('BackBtn', BackBtn)

app.mount('#app')
