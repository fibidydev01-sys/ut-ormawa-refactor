<template>
  <UserManagement />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })

useHead({ title: 'Pengguna — Admin Panel Ormawa' })
</script>
