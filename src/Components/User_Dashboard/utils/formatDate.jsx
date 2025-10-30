export const formatDate = (date) => {
  if (!date || isNaN(new Date(date))) return 'N/A';

  const givenDate = new Date(date);
  const now = new Date();

  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const timeString = givenDate.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  if (isSameDay(givenDate, now)) {
    return `Today, ${timeString}`;
  } else if (isSameDay(givenDate, yesterday)) {
    return `Yesterday, ${timeString}`;
  } else {
    return givenDate.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
};

export function toPascalCase(text = '') {
  return text
    .replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .trim();
}
