import { defineStore } from "pinia";
import type { Form } from "@/types/formTypes";
import { ref } from "vue";
import {db} from '../../firebase.ts'
import { addDoc, collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";

export const useFormsStore = defineStore("forms", () => {
    const forms = ref<Form[]>([]);
    const isLoading = ref<boolean>(false);
    const currentEditingFormId = ref<string | null>(null);
    let unsubscribe: () => void;

    const initRealtimeListener = () => {
        if (unsubscribe) unsubscribe();
        
        unsubscribe = onSnapshot(collection(db, "forms"), (snapshot) => {
            forms.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Form));
        });
    }

    const stopRealtimeUpdates = () => {
        if (unsubscribe) unsubscribe();
    }

    const addForm = async (form: Form) => {
        try {
            isLoading.value = true;
            const docRef = await addDoc(collection(db, "forms"), form);
            currentEditingFormId.value = docRef.id;
            return docRef.id;
        }
        catch (error) {
            console.log(error)
        }
        finally {
            isLoading.value = false;
        }
    }

    const clearEditingForm = () => {
        currentEditingFormId.value = null;
    }

    const deleteForm = async (id: string) => {
        await deleteDoc(doc(db, "forms", id)); 
    }

    return {
        forms,
        addForm,
        initRealtimeListener,
        stopRealtimeUpdates,
        deleteForm,
        isLoading,
        currentEditingFormId,
        clearEditingForm
    }
})