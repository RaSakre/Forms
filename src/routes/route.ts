import Constructor from "../pages/Constructor.vue"
import Form from "@/pages/Form.vue"
import MyForms from "@/pages/MyForms.vue"
import Login from "@/components/Auth/Login.vue"
import Register from "@/components/Auth/Register.vue"
import Profile from "@/pages/Profile.vue"
import ResetPassword from "@/components/Auth/ResetPassword.vue"
import Responses from "@/pages/Responses.vue"
import { createRouter,createWebHistory } from "vue-router"


const routes = [
    { path: '/constructor', component: Constructor },
    { path: '/constructor/:formId', component: Constructor, name: 'constructor' },
    {path: '/form/:id', component: Form },
    {path: '/', component: MyForms},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/profile', component: Profile},
    {path: '/reset-password', component: ResetPassword},
    {path: '/response/:id', component: Responses}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router