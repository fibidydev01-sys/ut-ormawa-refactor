// ============================================================
// useOrganizations — API organisasi untuk halaman & komponen
// File: app/features/organizations/use-organizations.ts
// ============================================================

import * as service from './organizations.service'
import type { OrganizationDocument, OrganizationType } from '~/types/database'

export const useOrganizations = () => {
  const { requireDb } = useFirebase()

  return {
    getOrganizationById: (organization_id: string) =>
      service.getOrganizationById(requireDb(), organization_id),
    getAllOrganizations: (typeFilter?: OrganizationType) =>
      service.getAllOrganizations(requireDb(), typeFilter),
    createOrganization: (payload: Omit<OrganizationDocument, 'id'>) =>
      service.createOrganization(requireDb(), payload),
    updateOrganization: (
      organization_id: string,
      payload: Partial<Omit<OrganizationDocument, 'id'>>,
    ) => service.updateOrganization(requireDb(), organization_id, payload),
    deleteOrganization: (organization_id: string) =>
      service.deleteOrganization(requireDb('Firestore belum siap.'), organization_id),
  }
}
