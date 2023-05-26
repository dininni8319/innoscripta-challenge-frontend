export const base_url = import.meta.env.VITE_BASE_URL
export const newsApiUrl = import.meta.env.VITE_NEWS_API_URL
export const newsApiKey = import.meta.env.VITE_NEWS_API_KEYS

export const userInitials = (string) =>
  string
    .split(' ')
    .map((el) => el[0])
    .join('')
