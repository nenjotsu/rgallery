export const getFullYear = dateString => {
  const text = dateString;
  const d = new Date(text);
  const n = d.getFullYear();
  return n;
};
