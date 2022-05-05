import { useAdminUser } from '$lib/context/AdminContext';
import http from '$lib/http';
import { formatDate } from '$lib/utils/formatDate';
import { safeFormDataAppend } from '$lib/utils/safeFormDataAppend';
import { useHistory } from 'react-router-dom';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
import { isFile } from './isFile';

/**
 *
 * @param {{
 * pathAfterUpdate?: string
 * }} params
 */

export const useSaveAsDraft = (params = {}) => {
  const { accessToken, refetchOrg } = useAdminUser();
  const { pathAfterUpdate = '' } = params;

  const router = useHistory();

  const { details } = useEventDetailsStore();

  const saveAsDraft = async () => {
    const fd = new FormData();
    fd.append('desc', details.description);
    safeFormDataAppend(fd, 'cover_photo', details.coverphoto, isFile);
    safeFormDataAppend(fd, 'event_photo1', details.eventphoto1, isFile);
    safeFormDataAppend(fd, 'event_photo2', details.eventphoto2, isFile);
    safeFormDataAppend(fd, 'event_photo3', details.eventphoto3, isFile);
    safeFormDataAppend(fd, 'event_photo4', details.eventphoto4, isFile);

    fd.append('location', details.location);
    fd.append('name', details.name);
    fd.append('start_date', formatDate(details.startDate));
    fd.append('end_date', formatDate(details.endDate));
    // var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    // fd.append('last_updated', utc);
    fd.append('status', 'Draft');
    fd.append('accepting_responses', details.acceptingResponses);
    fd.append('is_past_event', details.is_past_event);
    fd.append('old_respondents', details.responsesSheet);
    fd.append('form_description', details.formDescription);

    await http.put(`events/${details.id}/`, fd, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    await refetchOrg();
    if (pathAfterUpdate) {
      router.push(pathAfterUpdate);
    }
  };

  return {
    saveAsDraft,
  };
};
