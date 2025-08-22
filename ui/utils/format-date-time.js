export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  const pad = (n) => String(n).padStart(2, '0');
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const yyyy = d.getFullYear();
  const HH = pad(d.getHours());
  const MM = pad(d.getMinutes());
  return `${mm}/${dd}/${yyyy}, ${HH}:${MM}`;
};
