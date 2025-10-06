import { defineStore } from "pinia";
import { auth, db } from "../../firebase";
import { useFormsStore } from "./forms";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";
import { computed, ref } from "vue";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { IProfileData, IRegisterModel } from "@/types/formTypes";
import type { ComputedRef, Ref } from "vue";

export const useAuthStore = defineStore("user", () => {
  const formsStore = useFormsStore();
  const userState: Ref<User | null> = ref<User | null>(null);
  const userData = ref<any>(null);
  const isAuth: ComputedRef<boolean | null> = computed(() => {
    if (userState.value === null) {
      return null;
    } else {
      return true;
    }
  });
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userState.value = user;
      localStorage.setItem("token", user.accessToken);
      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (doc.exists()) {
          userData.value = doc.data();
        }
      });
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        userData.value = userDoc.data();
        console.log("Добро пожаловать,", userData.value.firstName);
      }
      return () => unsubscribe();
    } else {
      userState.value = null;
      userData.value = null;
      localStorage.removeItem("token");
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
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      throw error;
    }
  };
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error;
    }
  };
  const logout = () => {
    signOut(auth);
  };

  const updateUserData = async (data: IProfileData) => {
    try {
      const uid = userState.value?.uid;
      if (uid) {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
        if (userData.value) {
          userData.value = {
            ...userData.value,
            ...data,
            updatedAt: new Date(),
          };
        }
      }
    } catch (error) {
      console.error("Ошибка обновления данных пользователя:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Письмо для сброса пароля отправлено на адрес:", email);
    } catch (error) {
      console.error("Ошибка при отправке письма для сброса пароля:", error);
      throw error;
    }
  };

  return {
    userState,
    isAuth,
    register,
    login,
    logout,
    userData,
    updateUserData,
    resetPassword,
  };
});
