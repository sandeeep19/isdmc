import apiClient from './client';

export { apiClient };

// Types
// Types
export interface Photo {
  id: number
  title: string
  image_file: string
  photographer?: string
  description?: string
  location_text?: string
}

export interface Place {
  id: number
  title: string
  slug: string
  type: 'ghat' | 'temple' | 'shop' | 'alley' | 'museum' | 'other'
  location?: { lat: number; lng: number }
  address: string
  neighbourhood: string
  short_description: string
  long_description: string
  history_story?: string
  open_hours?: string
  entry_fee?: string
  best_time_to_visit?: string
  visitor_tips?: string
  tags: string[]
  images: Photo[]
  featured: boolean
  seo_title: string
  seo_description: string
  is_wheelchair_accessible: boolean
  is_elderly_friendly: boolean
  crowd_level: number
}

export interface Food {
  id: number
  name: string
  slug: string
  dish_type: 'breakfast' | 'snack' | 'sweet' | 'drink' | 'meal'
  origin_story?: string
  where_to_eat: number[]
  spice_level?: 'mild' | 'medium' | 'hot'
  best_time?: string
  recommended_stalls?: string[]
  images: Photo[]
  tags: string[]
  is_wheelchair_accessible: boolean
  is_elderly_friendly: boolean
  crowd_level: number
}

export interface HiddenGem {
  id: number
  title: string
  slug: string
  category: 'place' | 'food' | 'story' | 'photo'
  description: string
  how_to_find: string
  coordinates?: { lat: number; lng: number }
  difficulty_accessibility?: string
  tags: string[]
  images: Photo[]
  contributor_name: string
  verification_status: 'pending' | 'approved' | 'rejected'
  is_wheelchair_accessible: boolean
  is_elderly_friendly: boolean
  crowd_level: number
  published_at?: string
}

export interface Event {
  id: number
  title: string
  start_datetime: string
  end_datetime?: string
  location: string
  description: string
  recurring: boolean
  event_type: 'aarti' | 'festival' | 'cultural' | 'market' | 'other'
  images?: Photo[]
  ticket_link?: string
}

export interface Story {
  id: number
  title: string
  slug: string
  hero_image: Photo
  summary: string
  body: string
  author_name: string
  related_places: Place[]
  tags: { id: number; name: string }[]
  publish_date: string
}

// API functions
// API functions
export const placesApi = {
  list: async (params?: { type?: string; neighbourhood?: string; featured?: boolean; search?: string; limit?: number }) => {
    const { data } = await apiClient.get<{ results: Place[]; count: number }>('places/', { params });
    return data;
  },
  detail: async (slug: string) => {
    const { data } = await apiClient.get<Place>(`places/${slug}/`);
    return data;
  },
}

export const foodsApi = {
  list: async (params?: { dish_type?: string; search?: string; limit?: number }) => {
    const { data } = await apiClient.get<{ results: Food[]; count: number }>('foods/', { params });
    return data;
  },
  detail: async (slug: string) => {
    const { data } = await apiClient.get<Food>(`foods/${slug}/`);
    return data;
  },
}

export const gemsApi = {
  list: async (params?: { category?: string; status?: string; limit?: number }) => {
    const { data } = await apiClient.get<{ results: HiddenGem[]; count: number }>('gems/', { params });
    return data;
  },
  detail: async (slug: string) => {
    const { data } = await apiClient.get<HiddenGem>(`gems/${slug}/`);
    return data;
  },
  submit: async (formData: FormData) => {
    const { data } = await apiClient.post('gems/submit/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
}

export const eventsApi = {
  list: async (params?: { event_type?: string; upcoming?: boolean; limit?: number }) => {
    const { data } = await apiClient.get<{ results: Event[]; count: number }>('events/', { params });
    return data;
  },
  detail: async (id: number) => {
    const { data } = await apiClient.get<Event>(`events/${id}/`);
    return data;
  },
}

export const storiesApi = {
  list: async (params?: { search?: string; limit?: number }) => {
    const { data } = await apiClient.get<{ results: Story[]; count: number }>('stories/', { params });
    return data;
  },
  detail: async (slug: string) => {
    const { data } = await apiClient.get<Story>(`stories/${slug}/`);
    return data;
  },
}

export const authApi = {
  login: async (username: string, password: string) => {
    const { data } = await apiClient.post<{ access: string; refresh: string }>('auth/token/', { username, password });
    return data;
  },
  refresh: async (refresh: string) => {
    const { data } = await apiClient.post<{ access: string }>('auth/token/refresh/', { refresh });
    return data;
  },
  profile: async () => {
    const { data } = await apiClient.get('profiles/me/');
    return data;
  },
}

export default apiClient
