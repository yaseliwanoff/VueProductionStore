<script setup>
import { useAuthUserState } from "../stores/auth";

const user = useAuthUserState();
</script>

<template>
  <h1>{{ user.fullName }}</h1>
  <p>{{ user.email }}</p>
</template>
