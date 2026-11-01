// ============================================================
// useArticleDetail / useArticleSeo — data & SEO halaman /berita/[slug]
// File: app/features/articles/use-article-detail.ts
//
// Dipindah apa adanya dari pages/berita/[slug].vue (S4):
//   - data diambil di server lewat /api/articles/[slug] agar meta tag
//     terisi saat SSR; fallback ke Firestore client bila API gagal
//   - meta tag dinamis + JSON-LD NewsArticle
// ============================================================

import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ArticleDocument } from '~/types/database'

export async function useArticleDetail(slug: ComputedRef<string>) {
  // Ambil data artikel melalui server API endpoint agar meta tags terisi saat SSR
  const { data: articleData, pending: isLoading } = await useAsyncData(
    `article-${slug.value}`,
    async () => {
      try {
        return await $fetch<ArticleDocument>(`/api/articles/${slug.value}`)
      } catch {
        // Fallback ke Firebase client composable jika di browser dan API gagal
        if (import.meta.client) {
          try {
            const { getArticleBySlug } = useArticles()
            return await getArticleBySlug(slug.value)
          } catch (clientErr) {
            console.error('[Article Client Fallback] Gagal:', clientErr)
          }
        }
        return null
      }
    },
    {
      watch: [slug],
    },
  )

  const article = computed(() => articleData.value)
  return { article, isLoading }
}

export function useArticleSeo(
  article: ComputedRef<ArticleDocument | null | undefined>,
  slug: ComputedRef<string>,
) {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string) || 'https://ormawa-utsurabaya.web.app'

  const articleExcerpt = computed(() => {
    if (!article.value?.content)
      return 'Baca liputan dan artikel selengkapnya di Ormawa Universitas Terbuka Surabaya.'
    return article.value.content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160)
  })

  const pageTitle = computed(() => {
    return article.value?.title ? article.value.title : 'Artikel Tidak Ditemukan'
  })

  const articleUrl = computed(() => `${siteUrl}/berita/${slug.value}`)
  const articleImage = computed(
    () => article.value?.cover_image_url || `${siteUrl}/img/Background%20ormawa.png`,
  )

  // Dynamic SEO Meta Tags (SSR Compatible)
  useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    description: articleExcerpt,
    ogDescription: articleExcerpt,
    ogImage: articleImage,
    ogUrl: articleUrl,
    ogType: 'article',
    articlePublishedTime: () =>
      typeof article.value?.created_at === 'string' ? article.value.created_at : undefined,
    articleModifiedTime: () =>
      typeof article.value?.updated_at === 'string' ? article.value.updated_at : undefined,
    // unhead mengetik ini sebagai array; 1 elemen = 1 <meta> (sama dengan string sebelumnya)
    articleAuthor: () => [article.value?.organization_name || 'Ormawa UT Surabaya'],
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: articleExcerpt,
    twitterImage: articleImage,
  })

  // Schema.org NewsArticle Structured Data
  useHead({
    script: computed(() => {
      if (!article.value) return []
      return [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.value.title,
            image: [articleImage.value],
            datePublished: article.value.created_at || new Date().toISOString(),
            dateModified:
              article.value.updated_at || article.value.created_at || new Date().toISOString(),
            author: {
              '@type': 'Organization',
              name: article.value.organization_name || 'Ormawa UT Surabaya',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Ormawa UT Surabaya',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/img/Favicon_bulat_transparan.png`,
              },
            },
            description: articleExcerpt.value,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': articleUrl.value,
            },
          }),
        },
      ]
    }),
  })
}
