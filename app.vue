<template>
  <client-only>
    <NuxtPage class="pages" />
  </client-only>
</template>

<script setup lang="ts">
onMounted(() => {
  // document.documentElement.classList.add('dark')
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #f7fafc;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
