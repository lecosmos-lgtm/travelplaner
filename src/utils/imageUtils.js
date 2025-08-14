export const unsplash = (location, keywords = []) => {
  const base = 'https://source.unsplash.com/800x600'
  const search = [location, ...keywords].join(',')
  return `${base}/?${encodeURIComponent(search)}`
}