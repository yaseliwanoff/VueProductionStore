<script setup>
import { useAuthUserState } from "../../../stores/auth";

const user = useAuthUserState();
</script>

<template>
  <section>
    <div class="hero__main">
      <div class="hero__main--left">
        <div class="hero__main--texts">
          <h1 class="text-5xl font-bold max-w-[450px] hero__main--title">
            Теперь новый уровень обучения!
          </h1>
          <p class="text-sm opacity-70 max-w-[300px]">
            Обучайся комфортно и из любой точки получая качественное обучение
          </p>
        </div>
        <div
          v-if="user.isAuthenticated === false"
          class="flex items-start gap-2.5"
        >
          <router-link to="/register" class="create__btn"
            >Создать аккаунт</router-link
          >
          <router-link to="/about" class="about__btn">О нас</router-link>
        </div>
        <div v-else style="margin-top: 20px">
          <router-link to="/personal-page" class="page__btn relative">
            Перейти в кабинет
            <span class="badge">Теперь с 2026г</span>
          </router-link>
        </div>
      </div>
      <div class="hero__main--right">
        <div class="blue__boll--1"></div>
        <div class="blue__boll--2"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero__main--texts {
  margin-bottom: 10px;
}

.page__btn {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  left: 50%;
  top: 130%;
  font-size: 12px;
  transform: translateX(-50%) translateY(-50%);
  bottom: auto;
  height: 50%;
  line-height: 1;
  z-index: -1;
  background-color: rgb(221, 52, 52);
  color: rgb(249, 222, 222);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  padding-block: 10px;
  border-radius: 0px 0px 5px 5px;
}

.blue__boll--1 {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background-color: rgb(154, 154, 154);
  opacity: 0.2;
  filter: blur(600px);
}

.blue__boll--2 {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 200px;
  height: 200px;
  background-color: rgb(255, 255, 255);
  opacity: 0.6;
  filter: blur(1000px);
}

.hero__main--left {
  z-index: 10;
}

.hero__main {
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  max-width: 100%;
  border-radius: 10px;
  background-color: rgb(12, 12, 12);
  border: 1px solid rgb(32, 32, 32);
  height: 350px;
}

.hero__main--title {
  margin-bottom: 10px;
}

.create__btn {
  margin-top: 10px;
  width: fit-content;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  padding-block: 5px;
  padding-inline: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  transition: 0.2s ease;
}

.page__btn {
  margin-top: 10px;
  width: fit-content;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  padding-block: 5px;
  padding-inline: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  transition: 0.2s ease;
}

.about__btn {
  margin-top: 10px;
  border: 1px solid rgb(44, 44, 44);
  width: fit-content;
  cursor: pointer;
  font-size: 14px;
  padding-block: 5px;
  padding-inline: 15px;
  border-radius: 8px;
  background-color: #1e1e1e;
  color: #b3b3b3;
  transition: 0.2s ease;
}
</style>
