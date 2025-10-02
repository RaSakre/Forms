import { defineStore } from "pinia";
import { auth, db } from "../../firebase";
import { useFormsStore } from "./forms";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { computed, ref } from "vue";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { IRegisterModel } from "@/types/formTypes";
import type { Ref } from "vue";

export const useAuthStore = defineStore("user", () => {
  const formsStore = useFormsStore();
  const userState:Ref<User | null> = ref<User | null>(null);
  const userData = ref<any>(null);
  const isAuth = computed(() => {
    return !!userState.value;
  });
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userState.value = user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        userData.value = userDoc.data();
        console.log("Добро пожаловать,", userData.value.firstName);
      }
    } else {
      userState.value = null;
      formsStore.clearForms();
    }
  });
  const register = async ({
    email,
    password,
    name,
    surname,
  }: IRegisterModel) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName: name,
        lastName: surname,
        email: email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log("Данные пользователя сохранены в Firestore");
      console.log("Пользователь зарегистрирован:", user);
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };
  const logout = () => {
    signOut(auth);
  };
  return {
    userState,
    isAuth,
    register,
    login,
    logout,
    userData,
  };
});
