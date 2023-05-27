export const base_url = import.meta.env.VITE_BASE_URL
export const newsApiUrl = import.meta.env.VITE_NEWS_API_URL
export const newsApiKey = import.meta.env.VITE_NEWS_API_KEYS
export const topNewUrl = import.meta.env.VITE_TOP_NEW_API

export const funFormatDate = (str) => {
  if (str === '' || str === null) return 'Nessun dato fornito'
  
  let myDate = new Date(str)
  let utc = `
  ${myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()}.${
    myDate.getMonth() + 1 < 10
    ? '0' + (myDate.getMonth() + 1)
    : myDate.getMonth() + 1
  }.${myDate.getFullYear()}`
  
  return utc
}

export const daysBefore = (days) => {
  let dateOffset = (24 * 60 * 60 * 1000) * days; //5 days
  let myDate = new Date();
  myDate.setTime(myDate.getTime() - dateOffset);
}

export const userInitials = (string) =>
  string
    .split(' ')
    .map((el) => el[0])
    .join('')
