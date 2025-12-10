<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthUserState } from "../stores/auth";

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
      <form @submit.prevent="handleLogin" class="form flex flex-col gap-2">
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
          :disabled="userStore.isLoading"
          class="register__btn"
        >
          Войти
        </button>
      </form>
    </div>
  </section>
</template>

<style>
.form {
  width: fit-content;
  max-width: 300px;
  padding: 10px;
  background-color: rgb(9, 9, 9);
  border-radius: 10px;
  border: 1px solid rgb(34, 34, 34);
}

.form__input {
  width: 100%;
  max-width: 100vh;
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

.register__btn {
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  padding-block: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  transition: 0.2s ease;
}

.register__btn:hover {
  opacity: 0.9;
}
</style>
