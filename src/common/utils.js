export const getFullYear = (dateString, updatedAt) => {
  const text = updatedAt || dateString;
  const d = new Date(text);
  const n = d.getFullYear();
  return n;
};
