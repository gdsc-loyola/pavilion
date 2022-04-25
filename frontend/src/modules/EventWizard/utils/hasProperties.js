const detailsKeys = [
  'id',
  'name',
  'startDate',
  'endDate',
  'location',
  'description',
  'formDescription',
  'status',
  'coverphoto',
  'acceptingResponses',
  'is_past_event',
];
export const hasDetailsExceptEventPhotos = (details, omit = []) => {
  return detailsKeys.every((key) => {
    if (omit.includes(key)) {
      return true;
    }

    if (typeof details[key] === 'undefined' || details[key] === null) {
      return false;
    }

    if (typeof details[key] === 'string' && details[key] === '') {
      return false;
    }

    return true;
  });
};
