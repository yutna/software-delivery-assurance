<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { counterpartPath, hasTranslationStatus } from "./translation";

const { frontmatter, lang, page, site } = useData();

const isThai = computed(() => lang.value.startsWith("th"));
const visible = computed(
  () => hasTranslationStatus(frontmatter.value) && !isThai.value,
);
const counterpart = computed(() => {
  const path = counterpartPath(page.value.relativePath);

  if (path === undefined) return undefined;

  const target =
    site.value.cleanUrls || path.endsWith("/") ? path : `${path}.html`;
  return withBase(target);
});
</script>

<template>
  <p v-if="visible && counterpart" class="language-links">
    Also available in
    <a :href="counterpart">ภาษาไทย</a>.
  </p>
</template>
