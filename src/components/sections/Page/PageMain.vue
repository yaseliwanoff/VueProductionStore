<script setup>
import Sidebar from "./Sidebar.vue";
import Items from "./Items.vue";
</script>

<template>
  <section>
    <div class="flex items-start">
      <div class="h-screen w-1/3 sidebar__block">
        <Sidebar />
      </div>
      <div class="w-full items__block">
        <Items />
      </div>
    </div>
  </section>
</template>

<style>
.sidebar__block {
  background-color: rgb(14, 14, 14);
  padding: 10px 20px;
}

.items__block {
  padding: 0px 20px;
}
</style>
