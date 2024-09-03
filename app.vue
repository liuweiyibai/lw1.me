<script setup>
import { siteMetaData } from './data'

useHead({
  htmlAttrs: {
    lang: 'zh_Hans',
  },
  meta: () => siteMetaData,
})
</script>

<template>
  <div class="bg-[#F1F2F4] dark:text-zinc-300   dark:bg-slate-950">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

html.dark {
  color-scheme: dark;
}


::view-transition-old(root),
::view-transition-new(root) {
  height: auto;
  width: 100vw;
  animation: none;
  mix-blend-mode: normal;
}

html.dark::view-transition-old(root) {
  z-index: 2147483646;
}

html.dark::view-transition-new(root) {
  z-index: 1;
}

html::view-transition-old(root) {
  z-index: 1;
}

html::view-transition-new(root) {
  z-index: 2147483646;
}
</style>
