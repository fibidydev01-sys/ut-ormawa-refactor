<template>
  <ArticleAdminList />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })

useHead({ title: 'Artikel — Admin Panel Ormawa' })
</script>
