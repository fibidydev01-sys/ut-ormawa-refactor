<template>
  <SandboxPreview />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false, // disable default layout to match the screenshot exactly
})

useHead({
  title: 'MCLIS - Dashboard',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>
