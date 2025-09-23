import Constructor from "../pages/Constructor.vue"
import Form from "@/pages/Form.vue"
import MyForms from "@/pages/MyForms.vue"
import { createRouter,createWebHistory } from "vue-router"

const routes = [
    { path: '/constructor', component: Constructor },
    {path: '/form', component: Form },
    {path: '/', component: MyForms},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router