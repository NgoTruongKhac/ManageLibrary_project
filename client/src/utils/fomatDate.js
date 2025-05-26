export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // "yyyy-MM-dd"
};
export const parseDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split("-");
  return new Date(year, month - 1, day);
};
