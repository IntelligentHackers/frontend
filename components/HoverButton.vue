<template>
  <button
    ref="buttonRef"
    :class="
      cn(
        'group relative w-auto max-w-80 cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold transition-all duration-300',
        'border-gray-800 bg-white text-gray-900 dark:border-white dark:bg-black dark:text-white', // 亮暗模式适配
        props.class
      )
    "
  >
    <div class="flex items-center gap-2">
      <div
        class="size-2 scale-100 rounded-lg bg-gray-900 dark:bg-white transition-all duration-300 group-hover:scale-[100.8]"
      ></div>
      <span
        class="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 dark:group-hover:text-gray-300"
      >
        {{ text }}
      </span>
    </div>

    <div
      class="absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100 text-gray-900 text-white dark:text-black"
    >
      <span class="whitespace-nowrap">{{ text }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-right"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { ref } from "vue";

interface Props {
  text?: string;
  class?: string;
}
const props = withDefaults(defineProps<Props>(), {
  text: "Button",
});

const buttonRef = ref<HTMLButtonElement>();
</script>