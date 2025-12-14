<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthUserState } from "../stores/auth";

import GoogleIcon from "../assets/icons/google.svg";
import AppleIcon from "../assets/icons/apple.svg";

const router = useRouter();
const userStore = useAuthUserState();

const formData = ref({
  fname: "",
  lname: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const isFormData = computed(() => {
  const data = formData.value;
  return (
    data.fname &&
    data.lname &&
    data.email &&
    data.password &&
    data.repeatPassword &&
    data.password === data.repeatPassword &&
    data.password.length >= 6
  );
});

const handleSubmit = async () => {
  console.log("Начало регистрации...");
  console.log("Данные формы:", formData.value);

  try {
    const result = await userStore.register(formData.value);
    console.log("Результат регистрации:", result);

    if (result.success) {
      console.log("Регистрация успешна!", result);
      alert("Регистрация успешна! Теперь вы можете войти в систему.");

      // Очистка формы
      formData.value = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        repeatPassword: "",
      };

      // Перенаправление на страницу входа
      router.push("/login");
    } else {
      console.error("Ошибка регистрации:", result.error);
      alert(result.error || "Произошла ошибка при регистрации");
    }
  } catch (error) {
    console.error("Неожиданная ошибка:", error);
    alert("Произошла непредвиденная ошибка");
  }
};

// Очищаем ошибки при монтировании компонента
onMounted(() => {
  userStore.error = null;
});
</script>

<template>
  <section>
    <div>
      <!-- Показываем ошибку, если она есть -->
      <div v-if="userStore.error" class="error-message">
        {{ userStore.error }}
      </div>

      <!-- Показываем индикатор загрузки -->
      <div v-if="userStore.isLoading" class="loading">Регистрация...</div>

      <div class="registration-container">
        <div class="left-form">
          <div class="flex flex-col">
            <div class="mb-[40px]">
              <h1 class="text-2xl font-bold">Регистрация</h1>
              <p class="opacity-60 text-sm max-w-[250px]">
                Для продолжения работы на сайте, нужно создать новый аккаунт
              </p>
            </div>
            <form
              @submit.prevent="handleSubmit"
              class="form flex flex-col gap-2"
            >
              <!-- Форма остается без изменений -->
              <div class="flex gap-[10px]">
                <div class="flex flex-col gap-1">
                  <label class="text-[12px] font-medium">Имя</label>
                  <input
                    id="fname"
                    v-model="formData.fname"
                    required
                    class="form__input"
                    type="text"
                    placeholder="Ярослав"
                    :disabled="userStore.isLoading"
                    minlength="2"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[12px] font-medium">Фамилия</label>
                  <input
                    id="lname"
                    v-model="formData.lname"
                    class="form__input"
                    type="text"
                    placeholder="Селиванов"
                    required
                    :disabled="userStore.isLoading"
                    minlength="2"
                  />
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[12px] font-medium">Почта</label>
                <input
                  id="email"
                  v-model="formData.email"
                  required
                  class="form__input"
                  type="email"
                  placeholder="example@site.com"
                  :disabled="userStore.isLoading"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[12px] font-medium"
                  >Пароль (минимум 6 символов)</label
                >
                <input
                  id="password"
                  v-model="formData.password"
                  required
                  class="form__input"
                  type="password"
                  placeholder="Ваш пароль"
                  :disabled="userStore.isLoading"
                  minlength="6"
                />
                <div
                  v-if="formData.password && formData.password.length < 6"
                  class="text-red-500 text-xs mt-1"
                >
                  Пароль должен содержать минимум 6 символов
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[12px] font-medium"
                  >Подтверждение пароля</label
                >
                <input
                  id="repeatPassword"
                  v-model="formData.repeatPassword"
                  required
                  class="form__input"
                  type="password"
                  placeholder="Повторите пароль"
                  :disabled="userStore.isLoading"
                  minlength="6"
                />
              </div>

              <!-- Показываем если пароли не совпадают -->
              <div
                v-if="
                  formData.password &&
                  formData.repeatPassword &&
                  formData.password !== formData.repeatPassword
                "
                class="text-red-500 text-xs"
              >
                Пароли не совпадают
              </div>

              <button
                type="submit"
                class="register__btn"
                :disabled="!isFormData || userStore.isLoading"
              >
                <span v-if="userStore.isLoading">Регистрация...</span>
                <span v-else>Создать аккаунт</span>
              </button>
              <p class="text-sm opacity-50 text-center">
                Уже есть аккаунт?
                <router-link class="underline font-medium" to="/login"
                  >Войти</router-link
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
        <div class="right-section">
          <!-- Содержимое правой части -->
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.registration-container {
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

.white__ball {
  position: absolute;
  bottom: -50%;
  z-index: 1;
  width: 550px;
  height: 550px;
  opacity: 0.3;
  filter: blur(460px);
  border-radius: 999px;
  background-color: #ffffff;
}

.right-section {
  /* background-color: #fbbf24; */
  background-image: url("../assets/images/jpg/lighthouse.jpg");
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
  font-size: 14px;
  font-weight: 300;
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

.register__btn {
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

.register__btn:hover:not(:disabled) {
  opacity: 0.9;
}

.register__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
