<script lang="ts" setup>
interface Props {
  path?: string
  title?: string
  date?: string
  description?: string
  image?: string
  alt?: string
  ogImage?: string
  tags?: Array<string>
  published?: boolean
}

withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'no-title',
  date: 'no-date',
  description: 'no-description',
  image: '/blogs-img/blog.jpg',
  alt: 'no-alt',
  ogImage: '/blogs-img/blog.jpg',
  tags: () => [],
  published: false,
})
</script>

<template>
  <article class="m-2 overflow-hidden border shadow-sm group dark:border-gray-800 rounded-2xl text-zinc-700 dark:text-zinc-300 ">
    <NuxtLink :to="path" class="grid grid-cols-1 gap-1 sm:grid-cols-10">
      <div class="sm:col-span-3">
        <NuxtImg
          class="h-full w-full object-cover object-center rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none shadow-lg group-hover:scale-[1.02] transition-all duration-500"
          width="300"
          :src="image"
          :alt="alt"
        />
      </div>
      <div class="p-5 sm:col-span-7">
        <h2 class="pb-1 text-xl font-semibold text-black dark:text-zinc-300 group-hover:text-sky-700 dark:group-hover:text-sky-400">
          {{ title }}
        </h2>
        <p class="text-ellipsis line-clamp-2">
          {{ description }}
        </p>
        <div class="mt-2 mb-1 text-sm text-black dark:text-zinc-300 md:flex md:space-x-6">
          <div class="flex items-center">
            <LogoDate />
            <p> {{ date }}</p>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <LogoTag />
            <p v-for="tag in tags" :key="tag">
              {{ tag }}
            </p>
          </div>
        </div>
        <div class="flex items-center pt-2 group-hover:underline text-sky-700 dark:text-sky-400">
          <p>Read More</p>
          <LogoArrow />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
