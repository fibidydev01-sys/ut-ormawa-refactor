<template>
  <PengurusEditor />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({ title: 'Struktur Pengurus — Admin Panel' })
</script>
