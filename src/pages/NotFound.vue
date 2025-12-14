<script setup>
import { router } from "../routes/index-route";

function goMain() {
  return router.push("/");
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col relative items-center justify-center text-center"
  >
    <div class="z-10">
      <h1 class="font-bold text-8xl">404</h1>
      <p class="max-w-[250px] text-sm opacity-70">
        Страница была не найдена или не существует
      </p>
      <button class="btn" @click="goMain">На главную</button>
    </div>
    <p class="z-1 absolute text-[400px] opacity-5 font-black">404</p>
    <div class="light absolute z-0"></div>
  </div>
</template>

<style scoped>
.light {
  width: 350px;
  height: 350px;
  background-color: rgb(255, 0, 0);
  border-radius: 999px;
  opacity: 30%;
  filter: blur(400px);
}

.btn {
  margin-top: 10px;
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
</style>
