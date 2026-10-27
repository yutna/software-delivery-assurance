<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import TranslationBanner from "./TranslationBanner.vue";
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <TranslationBanner />
    </template>
    <template #home-hero-before>
      <TranslationBanner />
    </template>
  </DefaultTheme.Layout>
</template>
