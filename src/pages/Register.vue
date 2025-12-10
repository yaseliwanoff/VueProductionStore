<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthUserState } from "../stores/auth";

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

      <form @submit.prevent="handleSubmit" class="form flex flex-col gap-2">
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
          <label class="text-[12px] font-medium">Подтверждение пароля</label>
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
      </form>
    </div>
  </section>
</template>

<style>
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
  font-size: 14px;
  font-weight: 300;
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

.register__btn:hover:not(:disabled) {
  opacity: 0.9;
}

.register__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
