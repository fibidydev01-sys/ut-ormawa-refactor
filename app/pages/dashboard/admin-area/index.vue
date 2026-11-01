<template>
  <AdminAreaHome />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth'],
})
</script>
