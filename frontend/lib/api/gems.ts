import apiClient from './client';

export interface HiddenGem {
  id: number;
  title: string;
  slug: string;
  category: 'place' | 'food' | 'story' | 'photo';
  description: string;
  how_to_find: string;
  coordinates?: { lat: number; lng: number };
  difficulty_accessibility?: string;
  tags: string[];
  images?: any[];
  contributor_name: string;
  contributor_profile?: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  moderator_notes?: string;
  published_at?: string;
}

export interface GemSubmission {
  title: string;
  category: 'place' | 'food' | 'story' | 'photo';
  description: string;
  how_to_find: string;
  coordinates?: { lat: number; lng: number };
  neighbourhood?: string;
  difficulty_accessibility?: string;
  tags: string[];
  images?: string[];
  contributor_name: string;
  contributor_email: string;
  contributor_profile?: string;
  captcha_token?: string;
}

export const gemsApi = {
  list: async (params?: {
    category?: string;
    verification_status?: 'approved';
    neighbourhood?: string;
  }) => {
    const { data } = await apiClient.get('gems/', { params });
    return data;
  },

  detail: async (slug: string) => {
    const { data } = await apiClient.get(`gems/${slug}/`);
    return data;
  },

  submit: async (submission: GemSubmission) => {
    const { data } = await apiClient.post('gems/submit/', submission);
    return data;
  },
};
