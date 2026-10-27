<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import {
  counterpartPath,
  readMachineTranslated,
  readTranslationStatus,
} from "./translation";

const { frontmatter, lang, page, site } = useData();

const status = computed(() => readTranslationStatus(frontmatter.value));
const machineTranslated = computed(() =>
  readMachineTranslated(frontmatter.value),
);
const isThai = computed(() => lang.value.startsWith("th"));
const visible = computed(() => status.value !== "complete");
const counterpart = computed(() => {
  const path = counterpartPath(page.value.relativePath);

  if (path === undefined) return undefined;

  const target =
    site.value.cleanUrls || path.endsWith("/") ? path : `${path}.html`;
  return withBase(target);
});
</script>

<template>
  <div v-if="visible" class="translation-banner" role="note">
    <p v-if="isThai">
      <strong>สถานะคำแปล: {{ status }}</strong>
      <span v-if="machineTranslated">
        · แปลด้วยเครื่อง ยังไม่ผ่านการตรวจทานโดยมนุษย์
      </span>
      <span v-else> · ยังไม่ผ่านการตรวจทานโดยมนุษย์</span>
    </p>
    <p v-else>
      <strong>Translation status: {{ status }}</strong>
      <span v-if="machineTranslated">
        · Machine translated; not reviewed by a human.
      </span>
      <span v-else> · Not reviewed by a human.</span>
    </p>
    <a v-if="counterpart" :href="counterpart">
      {{ isThai ? "อ่านฉบับภาษาอังกฤษ" : "Read the Thai version" }}
    </a>
  </div>
</template>
