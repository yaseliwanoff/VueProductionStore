<script setup>
import { useAuthUserState } from "../../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useAuthUserState();

const toggleLogout = async () => {
  user.logout();
  if (!user.isAuthenticated) {
    router.push("/");
  }
};
</script>

<template>
  <header class="container mx-auto flex justify-between items-center">
    <router-link to="/" class="flex flex-col items-start gap-0">
      <p to="/" class="font-bold text-[20px] mb-0">course.page</p>
      <p class="opacity-40 font-light text-[10px]">by Yaroslav Selivanov</p>
    </router-link>
    <nav class="header__nav">
      <ul class="flex items-center">
        <li>
          <router-link
            to="/"
            active-class="menu__link--current"
            class="menu__link"
          >
            <NavLink>Главная</NavLink>
          </router-link>
        </li>
        <li>
          <router-link
            to="/course"
            active-class="menu__link--current"
            class="menu__link"
            >Курсы</router-link
          >
        </li>
        <li>
          <router-link
            to="/personal-page"
            active-class="menu__link--current"
            class="menu__link"
            >Страница</router-link
          >
        </li>
        <li>
          <router-link
            to="/about"
            active-class="menu__link--current"
            class="menu__link"
            >О нас</router-link
          >
        </li>
        <li>
          <router-link
            to="/contacts"
            active-class="menu__link--current"
            class="menu__link"
            >Контакты</router-link
          >
        </li>
      </ul>
    </nav>
    <div v-if="user.isAuthenticated" class="user__personal">
      <router-link class="text-sm font-medium" to="/personal-page">{{
        user.fullName
      }}</router-link>
      <button type="submit" class="logout__btn" @click="toggleLogout">
        Выйти
      </button>
    </div>
    <div v-else class="btns__wrapper">
      <router-link class="logins__btn" to="/login">Вход</router-link>
      <router-link class="register__btn" to="/register"
        >Регистрация</router-link
      >
    </div>
  </header>
</template>

<style scoped>
header {
  padding-block: 10px;
}

.header__nav {
  padding: 5px;
  border-radius: 999px;
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(37, 37, 37);
}

.user__personal {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-block: 5px;
  padding-inline: 15px 5px;
  border-radius: 999px;
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(37, 37, 37);
}

.btns__wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.logins__btn {
  cursor: pointer;
  width: fit-content;
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(37, 37, 37);
  color: #b9b9b9;
  font-size: 14px;
  border-radius: 10px;
  padding-inline: 10px;
  padding-block: 5px;
  transition: 0.2s ease;
}

.logins__btn:hover {
  color: #ffffff;
  background-color: rgb(18, 18, 18);
}

.register__btn {
  cursor: pointer;
  width: fit-content;
  background-color: white;
  color: #000000;
  font-size: 14px;
  border-radius: 10px;
  padding-inline: 10px;
  padding-block: 5px;
  transition: 0.2s ease;
}

.logout__btn {
  cursor: pointer;
  width: fit-content;
  background-color: rgb(40, 16, 16);
  color: #ffdada;
  border-radius: 999px;
  font-size: 14px;
  border-radius: 10px;
  padding-inline: 10px;
  padding-block: 5px;
  transition: 0.2s ease;
  transition: 0.2s linear;
}

.logout__btn:hover {
  background-color: rgb(232, 43, 43);
}

.register__btn:hover {
  opacity: 0.8;
}

.menu__link {
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 999px;
  font-size: 14px;
  background-color: transparent;
  transition: 0.2s linear;
}

.menu__link:hover {
  background-color: rgb(30, 30, 30);
  color: #dbdbdb;
}

.menu__link--current {
  padding-inline: 10px;
  padding-block: 5px;
  border-radius: 999px;
  font-size: 14px;
  color: black;
  background-color: white;
}
</style>
