import { defineStore } from "pinia";
import type { Form, IForm } from "@/types/formTypes";
import { ref } from "vue";
import { db } from "../../firebase.ts";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

export const useFormsStore = defineStore("forms", () => {
  const forms = ref<IForm[]>([]);
  const allForms = ref<IForm[]>([]);
  const isLoading = ref<boolean>(false);
  const currentEditingFormId = ref<string | null>(null);
  let unsubscribe: () => void;

  const initRealtimeListener = () => {
    if (unsubscribe) unsubscribe();

    unsubscribe = onSnapshot(collection(db, "forms"), (snapshot) => {
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

  const stopRealtimeUpdates = () => {
    if (unsubscribe) unsubscribe();
  };

  const addForm = async (form: IForm) => {
    try {
      isLoading.value = true;
      const docRef = await addDoc(collection(db, "forms"), form);
      currentEditingFormId.value = docRef.id;
      return docRef.id;
    } catch (error) {
      console.log(error);
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

  const findForm = (input: string) => {
    forms.value = forms.value.filter((form) =>
      form.name.toLowerCase().includes(input.toLowerCase())
    );
    if (input === "") {
      forms.value = allForms.value;
    }
  };

  const editForm = async (form: IForm) => {
    const storeForm = forms.value.find((f) => f.id === form.id);
    try {
      isLoading.value = true;
      if (storeForm?.id) {
      const formDocRef = doc(db, "forms", storeForm.id);
      await updateDoc(formDocRef, {
        name: form.name,
        description: form.description,
        fields: form.fields,
        updatedAt: new Date(), 
      });
      return form;
    }
    } catch (error) {
      console.log(error);
    }
    finally {
      isLoading.value = false;
    }
  };

const sortByValue = (val: string) => {
  switch (val) {
    case 'new': {
      forms.value = forms.value.sort((a, b) => {
        if (a && b && a.createdAt && b.createdAt) {
          return a.createdAt < b.createdAt ? 1 : -1;
        }
        return 0
      })
    }
    break
    case 'old': {
      forms.value = forms.value.sort((a, b) => {
        if (a && b && a.createdAt && b.createdAt) {
          return a.createdAt > b.createdAt ? 1 : -1;
        } return 0
    })
  }
  break
    case 'a-z': {
      forms.value = forms.value.sort((a, b) => {
        if(a && b ) {
          return a.name.localeCompare(b.name)
        }
        return 0
      })
    }
    break
    case 'z-a': {
      forms.value = forms.value.sort((a, b) => {
        if(a && b ) {
          return b.name.localeCompare(a.name)
        }
        return 0
      })
    }
    break
    }
}

  return {
    forms,
    addForm,
    initRealtimeListener,
    stopRealtimeUpdates,
    deleteForm,
    isLoading,
    currentEditingFormId,
    clearEditingForm,
    findForm,
    allForms,
    editForm,
    sortByValue
  };
});
