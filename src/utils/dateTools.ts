export const yyyymmddToDate = (yyyymmdd: string) => {
  const jsonLike = [
    yyyymmdd.slice(0,4),
    yyyymmdd.slice(4,6),
    yyyymmdd.slice(6,8)
  ].join('-');
  return new Date(jsonLike)
}
