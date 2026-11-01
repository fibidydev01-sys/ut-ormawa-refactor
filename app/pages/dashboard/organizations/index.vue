<template>
  <OrganizationManagement />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({ title: 'Organisasi — Admin Panel Ormawa' })
</script>
