<template>
  <ArticleForm />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })

useHead({ title: 'Form Artikel — Admin Panel Ormawa' })
</script>
