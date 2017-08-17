export function getFormattedDate(unixTime) {
  const dateObj = new Date(unixTime);
  return `${dateObj.getDate()}-${dateObj.getMonth() +
    1}-${dateObj.getFullYear()}`;
}