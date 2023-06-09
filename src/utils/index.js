export const base_url = import.meta.env.VITE_BASE_URL
export const newsApiUrl = import.meta.env.VITE_NEWS_API_URL
export const newsApiKey = import.meta.env.VITE_NEWS_API_KEYS
export const topNewUrl = import.meta.env.VITE_TOP_NEW_API
export const guardianNewUrl = import.meta.env.VITE_API_URL_PATH
export const guardianApiKey = import.meta.env.VITE_GUARDIAN_API_KEY

export const funFormatDate = (str) => {
  let myDate = new Date(str)
  let utc = `
  ${myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()}-${
    myDate.getMonth() + 1 < 10
      ? '0' + (myDate.getMonth() + 1)
      : myDate.getMonth() + 1
  }-${myDate.getFullYear()}`

  return utc
}

export const daysBefore = (days) => {
  let dateOffset = 24 * 60 * 60 * 1000 * days //5 days
  let myDate = new Date()
  myDate.setTime(myDate.getTime() - dateOffset)
}

export const userInitials = (string) =>
  string
    .split(' ')
    .map((el) => el[0])
    .join('')

export function sortedData(articles) {
  return articles.sort((objA, objB) => {
    let dateB = new Date(objB.publishedAt).getTime()
    let dateA = new Date(objA.publishedAt).getTime()
    return dateB - dateA
  })
}

export const getAllSources = (articles, key) => {
  let data
  if (key === 'author') {
    data = new Set(articles?.map((article) => article[key]))
    return Array.from(data)
  }

  data = new Set(articles?.map((article) => article.source[key]))

  return Array.from(data)
}
