import { defineStore } from "pinia";
import type { Form } from "@/types/formTypes";
import { ref } from "vue";

export const useFormsStore = defineStore("forms", () => {
    const forms = ref<Form[]>([]);
    const addForm = (form: Form) => {
        if ((!form.name && !form.description) || form.questions.length === 0) {
            return;
        }
        forms.value.push(form);
    }
    return {
        forms,
        addForm,
    }
})