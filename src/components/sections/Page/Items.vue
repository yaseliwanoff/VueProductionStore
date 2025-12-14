<script setup>
const testItemsArray = [
  {
    id: 0,
    title: "Test title",
    description: "Test item main description in the block",
    timeDuration: "1",
    goLink: "#",
  },
  {
    id: 1,
    title: "Test title",
    description: "Test item main description in the block",
    timeDuration: "1",
    goLink: "#",
  },
  {
    id: 2,
    title: "Test title",
    description: "Test item main description in the block",
    timeDuration: "1",
    goLink: "#",
  },
  {
    id: 3,
    title: "Test title",
    description: "Test item main description in the block",
    timeDuration: "1",
    goLink: "#",
  },
  {
    id: 4,
    title: "Test title",
    description: "Test item main description in the block",
    timeDuration: "1",
    goLink: "#",
  },
];
</script>

<template>
  <div class="grid grid-cols-3 gap-2.5">
    <div
      class="rounded-[10px] border border-white/10 block"
      v-for="(items, index) in testItemsArray"
      :key="index"
    >
      <router-link :to="items.goLink">
        <h3 class="block__title">{{ items.title }}</h3>
        <p class="block__description">{{ items.description }}</p>
        <div>
          <span>{{ items.timeDuration }} h</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.block {
  padding: 15px;
}

.block__title {
  font-size: 20px;
  font-weight: 600;
}

.block__description {
  opacity: 70%;
  font-size: 14px;
}
</style>
