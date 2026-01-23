import apiClient from './client';

export interface Place {
  id: number;
  title: string;
  slug: string;
  type: 'ghat' | 'temple' | 'shop' | 'alley' | 'museum' | 'other';
  location?: { lat: number; lng: number };
  address: string;
  neighbourhood: string;
  short_description: string;
  long_description: string;
  history_story?: string;
  open_hours?: any;
  entry_fee?: string;
  best_time_to_visit?: string;
  visitor_tips?: string;
  tags: string[];
  images: any[];
  map_pin_icon: string;
  nearby_places?: number[];
  featured: boolean;
  seo_title: string;
  seo_description: string;
  schema_type: string;
  published_at?: string;
  author?: number;
}

export const placesApi = {
  list: async (params?: {
    type?: string;
    neighbourhood?: string;
    featured?: boolean;
    search?: string;
    ordering?: string;
    limit?: number;
  }) => {
    const { data } = await apiClient.get('places/', { params });
    return data;
  },

  detail: async (slug: string) => {
    const { data } = await apiClient.get(`places/${slug}/`);
    return data;
  },

  featured: async () => {
    const { data } = await apiClient.get('places/', { params: { featured: true } });
    return data;
  },
};
