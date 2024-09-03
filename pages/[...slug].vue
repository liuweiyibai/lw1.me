<script setup lang="ts">
useHead({
  title: '404',
  meta: [
    {
      name: 'description',
      content: '找不到页面啦',
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Wrong Path',
  title: '404',
  description: '找不到页面啦',
})
</script>

<template>
  <div class="py-5">
    <div class="container max-w-xl mx-auto">
      <Logo404 />
    </div>
  </div>
</template>
