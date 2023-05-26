export const base_url = import.meta.env.VITE_BASE_URL

export const userInitials = (string) =>
  string
    .split(' ')
    .map((el) => el[0])
    .join('')
