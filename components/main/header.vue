<script setup lang="ts">
import { navbarData } from '../../data'

const colorMode = useColorMode()


const isDark = computed(() => {
  return colorMode.value === 'dark'
})

function onClick(event: any, val: string) {

  if (!document.startViewTransition) {
    colorMode.preference = val
    return;
  }

  // 开始一次视图过渡：
  const transition = document.startViewTransition(() => { colorMode.preference = val });
  transition.ready.then(() => {
    const x = event.clientX;
    const y = event.clientY;
    //计算按钮到最远点的距离用作裁剪圆形的半径
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    //开始动画
    document.documentElement.animate({ clipPath: isDark.value ? [...clipPath].reverse() : clipPath, }, {
      duration: 400,
      easing: "ease-in",
      pseudoElement: isDark.value
        ? "::view-transition-old(root)"
        : "::view-transition-new(root)",
    }
    );
  });
}
</script>

<template>
  <div class="py-5 font-semibold border-b dark:border-gray-800">
    <div class="container flex items-baseline justify-between max-w-5xl px-6 mx-auto ">
      <ul class="flex items-baseline space-x-5">
        <li class="text-base font-bold sm:text-2xl font-blog">
          <NuxtLink to="/">
            <!-- {{ navbarData.homeTitle }} -->
              Liuwei's Blog
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex items-center space-x-3 text-sm sm:space-x-6 sm:text-lg">
        <li>
          <NuxtLink to="/blogs">
            Blogs
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/categories">
            Categories
          </NuxtLink>
        </li>
        <li title="About Me">
          <NuxtLink to="/about" aria-label="About me">
            About
          </NuxtLink>
        </li>
        <li>
          <ClientOnly>
            <button v-if="colorMode.value === 'light'" name="light-mode" title="Light"
              class="transition-all ease-out hover:scale-110 hover:cursor-pointer"
              @click="(e: any) => onClick(e, 'dark')">
              <Icon name="icon-park:moon" size="20" />
            </button>
            <button v-if="colorMode.value === 'dark'" name="dark-mode" title="Dark"
              class="transition-all ease-out hover:scale-110 hover:cursor-pointer"
              @click="(e: any) => onClick(e, 'light')">
              <Icon name="noto:sun" size="20" />
            </button>
            <template #fallback>
              <!-- this will be rendered on server side -->
              <Icon name="svg-spinners:180-ring" size="20" />
            </template>
          </ClientOnly>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.router-link-active .router-link-exact-active {
  @apply underline
}
 @font-face {
  font-family: blog-font;
  src: url('~/assets/arthemis-font/font.ttf');
}
.font-blog{
  font-family: blog-font;
}

</style>
