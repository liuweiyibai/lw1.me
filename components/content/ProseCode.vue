<template>
  <div class="relative overflow-hidden bg-[var(--tw-prose-pre-bg)] rounded-md group">
    <div class="box-border flex items-start justify-between px-4" v-if="filename || languageText">
      <span v-if="filename" class="mt-1 font-mono text-base text-white">
        {{ filename }}
      </span>
      <span v-if="languageText" :style="{ background: languageBackground!, color: languageColor! }"
        class="px-2 py-1 text-sm leading-3 uppercase rounded-b">
        {{ languageText }}
      </span>
    </div>
    <slot />
    <div class="flex justify-end ">
      <div class="px-2 mb-1 mr-[1px] text-xs text-white rounded bg-[#343848] py-1" v-if="copied">复制成功</div>
      <button @click="copy(code)"
        class="transition-opacity opacity-0  px-2 py-1 mb-1 mr-1 text-xs text-white rounded hover:bg-[#343848] group-hover:opacity-100">复制</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
const { copy, copied } = useClipboard();

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: Array<number>;
  }>(),
  { code: '', language: null, filename: null, highlights: () => [] }
);

const languageMap: Record<
  string,
  { text: string; color: string; background: string }
> = {
  vue: {
    text: 'vue',
    background: '#42b883',
    color: 'white',
  },
  js: {
    text: 'js',
    background: '#f7df1e',
    color: 'black',
  },
  html: {
    text: 'html',
    background: '#e34c26',
    color: 'white',
  },
  css: {
    text: 'css',
    background: '#2965f1',
    color: 'white',
  },
  python: {
    text: 'python',
    background: '#306998',
    color: 'white',
  },
  java: {
    text: 'java',
    background: '#b07219',
    color: 'white',
  },
  ruby: {
    text: 'ruby',
    background: '#cc342d',
    color: 'white',
  },
  php: {
    text: 'php',
    background: '#777bb3',
    color: 'white',
  },
  csharp: {
    text: 'csharp',
    background: '#239120',
    color: 'white',
  },
  cplusplus: {
    text: 'cplusplus',
    background: '#00599c',
    color: 'white',
  },
  swift: {
    text: 'swift',
    background: '#f05138',
    color: 'white',
  },
  go: {
    text: 'go',
    background: '#00add8',
    color: 'white',
  },
  kotlin: {
    text: 'kotlin',
    background: '#0095d5',
    color: 'white',
  },
  rust: {
    text: 'rust',
    background: '#dea584',
    color: 'black',
  },
  dart: {
    text: 'dart',
    background: '#0175c2',
    color: 'white',
  },
  r: {
    text: 'r',
    background: '#276dc3',
    color: 'white',
  },
  ts: {
    text: 'ts',
    background: '#3178c6',
    color: 'white',
  },
  shell: {
    text: 'shell',
    background: '#89e051',
    color: 'black',
  },
  bash: {
    text: 'shell',
    background: '#89e051',
    color: 'black',
  },
  sql: {
    text: 'sql',
    background: '#e38c00',
    color: 'white',
  },
  scala: {
    text: 'scala',
    background: '#dc322f',
    color: 'white',
  },
  perl: {
    text: 'perl',
    background: '#39457e',
    color: 'white',
  },
};

const languageText = computed(() =>
  props.language ? languageMap[props.language]?.text : null
);
const languageBackground = computed(() =>
  props.language ? languageMap[props.language]?.background : null
);
const languageColor = computed(() =>
  props.language ? languageMap[props.language]?.color : null
);


</script>

<style scoped lang="scss">
:slotted(pre) {
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  flex: 1 1 0%;
  overflow-x: auto;
  padding: 1rem;
  line-height: 1.625;
  counter-reset: lines;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0.34);
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.22);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.22);
  }

  &::-webkit-scrollbar-thumb {
    background: #4e4e4e;
    border-radius: 6px;
  }
}

:slotted(pre code) {
  width: 100%;
  display: flex;
  flex-direction: column;
}

:slotted(pre code .line) {
  display: inline-table;
  min-height: 1rem;
}

:slotted(pre code .line::before) {
  counter-increment: lines;
  content: counter(lines);
  width: 1rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: left;
  color: rgba(115, 138, 148, 0.4);
}

:slotted(pre code .highlight) {
  background-color: #363b46;
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid red;
}
</style>
