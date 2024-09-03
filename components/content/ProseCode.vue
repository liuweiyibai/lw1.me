<!-- <script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style> -->

<template>
  <div class="container">
    <span v-if="filename" class="filename-text">
      {{ filename }}
    </span>
    <span
      v-if="languageText"
      :style="{ background: languageBackground, color: languageColor }"
      class="language-text"
    >
      {{ languageText }}
    </span>
    <slot />
    <div class="bottom-container">
      <div class="copy-container">
        <span class="copied-text" v-if="copied">Copied code!</span>
        <button @click="copy(code)">Copy Code</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const { copy, copied, text } = useClipboard();

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: Array<number>;
  }>(),
  { code: '', language: null, filename: null, highlights: ()=>[] }
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
.container {
  background: #1e1e1e;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-top: 1em;
  overflow: hidden;
  border-radius: 0.5rem;
  .language-text  {
  position: absolute;
  top: 0;
  right: 1em;
  padding: 0.25em 0.5em;
  font-size: 14px;
  text-transform: uppercase;
  border-bottom-right-radius: 0.25em;
  border-bottom-left-radius: 0.25em;
}
}

.bottom-container {
  display: flex;
  justify-content: flex-end;
}

.copy-container {
  display: flex;
}

.copied-text {
  margin-right: 1em;
}

.filename-text  {
  position: absolute;
  top: 0;
  left: 1em;
  padding: 0.25em 0.5em;
  color: white;
  font-size: 14px;
}



:slotted(pre) {
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  flex: 1 1 0%;
  overflow-x: auto;
  padding: 1rem;
  line-height: 1.625;
  counter-reset: lines;
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
