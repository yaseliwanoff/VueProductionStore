<template>
  <section>
    <div class="marquee-content">
      <span class="marquee-text">Скидка на все курсы 5%</span>
      <span class="marquee-text">Скидка на все курсы 5%</span>
      <span class="marquee-text">Скидка на все курсы 5%</span>
      <span class="marquee-text">Скидка на все курсы 5%</span>
      <span class="marquee-text">Скидка на все курсы 5%</span>
      <span class="marquee-text">Скидка на все курсы 5%</span>
      <span class="marquee-text">Скидка на все курсы 5%</span>
      <span class="marquee-text">Скидка на все курсы 5%</span>
    </div>
  </section>
</template>

<style scoped>
section {
  margin-block: 25px;
  display: flex;
  overflow: hidden;
  background-color: #80d74e;
  border: 1px solid #aff985;
  position: relative;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  min-width: 100%;
  animation: marquee 20s infinite linear;
}

.marquee-text {
  font-size: 16px;
  color: black;
  font-family: sans-serif;
  padding-inline: 20px;
  padding-block: 10px;
  white-space: nowrap;
  flex-shrink: 0;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
