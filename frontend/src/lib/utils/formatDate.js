export const formatDate = (date) => {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return date;
};
