<script setup>
import Header from "@components/header/Header.vue";
</script>

<template>
  <Header />
  <main class="mx-auto">
    <slot></slot>
  </main>
</template>
