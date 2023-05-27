export const base_url = import.meta.env.VITE_BASE_URL
export const newsApiUrl = import.meta.env.VITE_NEWS_API_URL
export const newsApiKey = import.meta.env.VITE_NEWS_API_KEYS
export const topNewUrl = import.meta.env.VITE_TOP_NEW_API

export const funFormatDate = (str) => {
  // if (str === '' || str === null) return 'Nessun dato fornito'

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

  
  let sortedData = articles.sort(compareDates)
  return sortedData
}

export function compareDates(a, b) {
  const dateA = funFormatDate(a.publishedAt);
  console.log("🚀 ~ file: index.js:41 ~ compareDates ~ dateA:", dateA)
  
  const dateB = new Date(b.publishedAt);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
}
