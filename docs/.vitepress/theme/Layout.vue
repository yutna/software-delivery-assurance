<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import LanguageLinks from "./LanguageLinks.vue";
import TranslationBanner from "./TranslationBanner.vue";
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <TranslationBanner />
    </template>
    <template #doc-after>
      <LanguageLinks />
    </template>
    <template #home-hero-before>
      <TranslationBanner />
    </template>
  </DefaultTheme.Layout>
</template>
