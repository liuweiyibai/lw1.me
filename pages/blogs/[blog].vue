<script setup lang="ts">
import type { BlogPost } from '@/types/blog'
import dayjs from 'dayjs';
import { navbarData, seoData } from '~/data'

const { path } = useRoute()

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () => queryContent(path).findOne())

if (error.value)
  navigateTo('/404')

const data = computed<BlogPost>(() => {

  return {
    title: articles.value?.title || 'no-title available',
    description: articles.value?.description || 'no-description available',
    image: articles.value?.image || '/not-found.jpg',
    alt: articles.value?.alt || 'no alter data available',
    ogImage: articles.value?.ogImage || '/not-found.jpg',
    date: articles.value?.date ? dayjs(articles.value?.date).format('YYYY-MM-DD') : 'not-date-available',
    tags: articles.value?.tags || [],
    published: articles.value?.published || false,
  }
})

useHead({
  title: data.value.title || '',
  meta: [
    { name: 'description', content: data.value.description },
    {
      name: 'description',
      content: data.value.description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: navbarData.homeTitle },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: `${seoData.mySite}/${path}`,
    },
    {
      property: 'og:title',
      content: data.value.title,
    },
    {
      property: 'og:description',
      content: data.value.description,
    },
    {
      property: 'og:image',
      content: data.value.ogImage || data.value.image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@qdnvubp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: `${seoData.mySite}/${path}`,
    },
    {
      name: 'twitter:title',
      content: data.value.title,
    },
    {
      name: 'twitter:description',
      content: data.value.description,
    },
    {
      name: 'twitter:image',
      content: data.value.ogImage || data.value.image,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${seoData.mySite}/${path}`,
    },
  ],
})











// Generate OG Image
defineOgImageComponent('Test', {
  headline: 'Greetings 👋',
  title: data.value.title || '',
  description: data.value.description || '',
  link: data.value.ogImage,
});
</script>

<template>
  <div class="container max-w-5xl grid-cols-12 px-6 mx-auto sm:grid gap-x-12 ">
    <div class="col-span-12 lg:col-span-9">
      <BlogHeader :title="data.title" :image="data.image" :alt="data.alt" :date="data.date"
        :description="data.description" :tags="data.tags" />
      <div
        class="max-w-5xl mx-auto prose-sm prose prose-pre:max-w-xs sm:prose-pre:max-w-full sm:prose-base md:prose-lg prose-h1:no-underline prose-zinc dark:prose-invert prose-img:rounded-lg"
      >
        <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>页面找不到.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>
    <BlogToc />

    <div class="flex flex-row flex-wrap gap-2 mt-10 text-white md:flex-nowrap">
      <SocialShare v-for="network in ['facebook', 'twitter', 'linkedin', 'email']" :key="network" :network="network"
        :styled="true" :label="true" class="p-1" aria-label="Share with {network}" />
    </div>
  </div>
</template>
