<template>
  <main class="min-h-screen bg-gray-50 font-sans text-slate-800">
    <SiteHeader />

    <ArticleDetail :article="article" :loading="isLoading" />

    <SiteFooter />
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => (route.params.slug as string) || '')

const { article, isLoading } = await useArticleDetail(slug)
useArticleSeo(article, slug)
</script>
