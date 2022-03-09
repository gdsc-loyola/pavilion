/**
 * @param {import("$services/events.service").Event} a
 * @param {import("$services/events.service").Event} b
 */
export const defaultComparator = (a, b) => {
  if (a.status === 'Draft' && b.status === 'Published') {
    return -1;
  } else if (a.status === 'Published' && b.status === 'Draft') {
    return 1;
  }

  const aStart = new Date(a.start_date).getTime();
  const bStart = new Date(b.start_date).getTime();

  // a starts after b
  if (aStart > bStart) {
    return 1;
  }

  // a starts before b
  if (aStart < bStart) {
    return -1;
  }

  return a.name.localeCompare(b.name);
};
