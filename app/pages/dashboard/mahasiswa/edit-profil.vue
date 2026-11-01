<template>
  <MahasiswaProfileForm />
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'login-required' })
</script>
