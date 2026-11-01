// ============================================================
// useArticles — API artikel untuk halaman & komponen
// File: app/features/articles/use-articles.ts
//
// Bentuk API sama dengan composables/useArticles.ts lama, jadi
// pemanggil tidak berubah. Firestore diakses lewat articles.service.
// ============================================================

import * as service from './articles.service'
import type { ArticleDocument, CreateArticlePayload, UpdateArticlePayload } from '~/types/database'

export const useArticles = () => {
  const { requireDb } = useFirebase()

  return {
    createArticle: (payload: CreateArticlePayload) => service.createArticle(requireDb(), payload),
    getPublishedArticles: () => service.getPublishedArticles(requireDb()),
    getAllArticles: () => service.getAllArticles(requireDb()),
    getUkmArticles: (limitCount?: number, statusFilter?: ArticleDocument['status']) =>
      service.getUkmArticles(requireDb(), limitCount, statusFilter),
    getArticlesByOrganization: (
      organization_id: string,
      statusFilter: ArticleDocument['status'] | null = null,
    ) => service.getArticlesByOrganization(requireDb(), organization_id, statusFilter),
    getArticleBySlug: (slug: string) => service.getArticleBySlug(requireDb(), slug),
    getArticleDocument: (article_id: string) => service.getArticleDocument(requireDb(), article_id),
    updateArticleStatus: (article_id: string, new_status: ArticleDocument['status']) =>
      service.updateArticleStatus(requireDb(), article_id, new_status),
    updateArticle: (article_id: string, payload: UpdateArticlePayload) =>
      service.updateArticle(requireDb(), article_id, payload),
    deleteArticle: (article_id: string) => service.deleteArticle(requireDb(), article_id),
  }
}
