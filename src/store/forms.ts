import { defineStore } from "pinia";
import type {  IForm } from "@/types/formTypes";
import { ref, watch, type Ref } from "vue";
import { db } from "../../firebase.ts";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuthStore } from "./auth.ts";



export const useFormsStore = defineStore("forms", () => {
  const authStore = useAuthStore();
  const forms: Ref<IForm[]> = ref<IForm[]>([]);
  const allForms:Ref<IForm[]> = ref<IForm[]>([]);
  const isLoading:Ref<boolean> = ref<boolean>(false);
  const currentEditingFormId:Ref<string | null> = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

const initRealtimeListener = () => {
    if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }

  if (!authStore.userState) {
    forms.value = [];
    allForms.value = [];
    return;
  }
  const formsQuery = authStore.userState ? 
    query(
      collection(db, "forms"),
      where("userId", "==", authStore.userState.uid),
      orderBy("createdAt", "desc")
    ) :
    query(collection(db, "forms"), where("userId", "==", "no-user")); 
  unsubscribe = onSnapshot(formsQuery, (snapshot) => {
    forms.value = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as IForm)
    );
    allForms.value = forms.value;
  });
};

const stopRealtimeListener = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  forms.value = [];
  allForms.value = [];
};

watch(() => authStore.userState, (newUser) => {
  initRealtimeListener();
}, { immediate: true });



const addForm = async (form: IForm) => {
  try {
    isLoading.value = true;
    
    if (!authStore.userState) {
      throw new Error('Пользователь не авторизован');
    }

  const formData = {
      ...form,
      userId: authStore.userState.uid,
      createdAt: serverTimestamp(),
      fields: form.fields.map(field => ({
        component: field.component,
        options: { ...field.options }
      }))
    };
    
    const docRef = await addDoc(collection(db, "forms"), formData);
    currentEditingFormId.value = docRef.id;
    return docRef.id;
  } catch (error) {
    console.error('Ошибка создания формы:', error);
    throw error;
  } finally {
    isLoading.value = false;
  }
};

  const clearEditingForm = () => {
    currentEditingFormId.value = null;
  };

  const deleteForm = async (id: string) => {
    await deleteDoc(doc(db, "forms", id));
  };


const editForm = async (form: IForm) => {
  const storeForm = forms.value.find((f) => f.id === form.id);
  try {
    isLoading.value = true;
    if (!authStore.userState) {
      throw new Error('Пользователь не авторизован');
    }
    
    if (storeForm?.userId !== authStore.userState.uid) {
      throw new Error('У вас нет прав для редактирования этой формы');
    }

    if (storeForm?.id) {
      const formDocRef = doc(db, "forms", storeForm.id);
      await updateDoc(formDocRef, {
        name: form.name,
        description: form.description,
        fields: form.fields.map(field => ({
          component: field.component,
          options: { ...field.options },
        })),
        updatedAt: serverTimestamp(), 
      });
      return form;
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    isLoading.value = false;
  }
};

  const addAnswersToForm = async (formId: string, answers: Record<string, string>) => {
    const form = forms.value.find((form) => form.id === formId);
    try {
      if (form) {
        form.answers = answers;
        const formDocRef = doc(db, "forms", formId);
        await updateDoc(formDocRef, {
          ...form,
          answers: answers,
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loadSingleForm = async (formId: string): Promise<IForm | null> => {
  try {
    const docRef = doc(db, "forms", formId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as IForm;
    }
    return null;
  } catch (error) {
    console.error("Error loading form:", error);
    return null;
  }
};

const clearForms = () => {
  stopRealtimeListener()
};

  return {
    forms,
    addForm,
    initRealtimeListener,
    deleteForm,
    isLoading,
    currentEditingFormId,
    clearEditingForm,
    editForm,
    addAnswersToForm,
    loadSingleForm,
    clearForms
  };
});
