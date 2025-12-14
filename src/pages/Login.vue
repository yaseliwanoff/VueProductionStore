<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthUserState } from "../stores/auth";

import GoogleIcon from "../assets/icons/google.svg";
import AppleIcon from "../assets/icons/apple.svg";

const router = useRouter();
const userStore = useAuthUserState();

const loginData = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  const result = await userStore.login(loginData.value);
  if (result.success) {
    router.push("/");
  } else {
    alert(result.error);
  }
};
</script>

<template>
  <section>
    <div>
      <div v-if="userStore.error" class="error-message">
        {{ userStore.error }}
      </div>

      <div class="login-container">
        <div class="left-form">
          <div class="flex flex-col">
            <div class="mb-[40px]">
              <h1 class="text-2xl font-bold">Вход</h1>
              <p class="opacity-60 text-sm max-w-[250px]">
                Для продолжения работы с сайтом, нужно войти в свой аккаунт
              </p>
            </div>
            <form
              @submit.prevent="handleLogin"
              class="form flex flex-col gap-2"
            >
              <div class="flex flex-col gap-1">
                <label class="text-[12px] font-medium">Почта</label>
                <input
                  id="email"
                  v-model="loginData.email"
                  required
                  class="form__input"
                  type="email"
                  placeholder="example@site.com"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[12px] font-medium">Пароль</label>
                <input
                  id="password"
                  v-model="loginData.password"
                  required
                  class="form__input"
                  type="password"
                  placeholder="Ваш пароль"
                />
              </div>
              <button
                type="submit"
                class="login__btn"
                :disabled="!loginData || userStore.isLoading"
              >
                <span v-if="userStore.isLoading">Вход...</span>
                <span v-else>Войти в аккаунт</span>
              </button>
              <p class="text-sm opacity-50 text-center">
                Еще нету аккаунта?
                <router-link class="underline font-medium" to="/register"
                  >Создать</router-link
                >
              </p>
              <div class="flex flex-col justify-center items-center">
                <div class="flex gap-2.5 items-center">
                  <div class="w-[50px] h-[1px] bg-white/30"></div>
                  <p class="text-sm opacity-40">Или</p>
                  <div class="w-[50px] h-[1px] bg-white/30"></div>
                </div>
                <button
                  class="another__btn flex items-center justify-center gap-2"
                >
                  <img
                    class="w-4 h-4 opacity-50"
                    :src="GoogleIcon"
                    alt="google"
                  />
                  Google
                </button>
                <button
                  class="another__btn flex items-center justify-center gap-2"
                >
                  <img
                    class="w-4 h-4 opacity-50"
                    :src="AppleIcon"
                    alt="apple"
                  />
                  Apple
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="right-section"></div>
      </div>
    </div>
  </section>
</template>

<style>
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  height: 100%;
  gap: 10px;
}

.left-form {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgb(34, 34, 34);
  height: 100%;
  overflow: hidden;
}

.form {
  z-index: 10;
  width: 100%;
  max-width: 340px;
  background-color: rgba(9, 9, 9, 0.323);
  padding: 20px;
  border-radius: 8px;
}

.right-section {
  /* background-color: #fbbf24; */
  background-image: url("../assets/images/jpg/ghost.jpeg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #fcc;
}

.loading {
  background-color: #eef;
  color: #336;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccf;
}

.form__input {
  width: 100%;
  height: 40px;
  padding-inline: 10px;
  border-radius: 8px;
  border: 1px solid rgb(41, 41, 41);
  background-color: rgb(15, 15, 15);
  font-weight: 400;
}

.form__input::placeholder {
  opacity: 0.3;
}

.another__btn {
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  padding-block: 10px;
  border-radius: 8px;
  background-color: #000000;
  border: 1px solid #1f1f1f;
  color: #818181;
  transition: 0.2s ease;
}

.another__btn:hover {
  background-color: #131313;
}

.login__btn {
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  padding-block: 10px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  transition: 0.2s ease;
}

.login__btn:hover:not(:disabled) {
  opacity: 0.9;
}

.login__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
