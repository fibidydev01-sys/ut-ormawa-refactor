<template>
  <DashboardOverview />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({ title: 'Dashboard — Admin Panel Ormawa' })
</script>
