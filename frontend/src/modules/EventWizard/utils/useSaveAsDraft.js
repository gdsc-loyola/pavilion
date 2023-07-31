import { useAdminUser } from '$lib/context/AdminContext';
import http from '$lib/http';
import { formatDate } from '$lib/utils/formatDate';
import { safeFormDataAppend } from '$lib/utils/safeFormDataAppend';
import { useHistory } from 'react-router-dom';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
import { isFile } from './isFile';
import { object, string, date, ref } from 'yup';
import * as mui from '@mui/material';

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
    fd.append('desc', details.description.trim());
    safeFormDataAppend(fd, 'cover_photo', details.coverphoto, isFile);
    safeFormDataAppend(fd, 'event_photo1', details.eventphoto1, isFile);
    safeFormDataAppend(fd, 'event_photo2', details.eventphoto2, isFile);
    safeFormDataAppend(fd, 'event_photo3', details.eventphoto3, isFile);
    safeFormDataAppend(fd, 'event_photo4', details.eventphoto4, isFile);

    fd.append('location', details.location.trim());
    fd.append('name', details.name.trim());
    fd.append('start_date', formatDate(details.startDate));
    fd.append('end_date', formatDate(details.endDate));
    // var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    // fd.append('last_updated', utc);
    fd.append('status', 'Draft');
    fd.append('accepting_responses', details.acceptingResponses);
    fd.append('is_past_event', details.is_past_event);
    fd.append('old_respondents', details.responsesSheet);
    fd.append('form_description', details.formDescription);

    //validation using Yup
    const eventSchema = object({
      location: string().trim().required('You must provide an Event Location'),
      name: string()
        .trim()
        .test({
          test(value, ctx) {
            if (value.trim().startsWith('Untitled Event') || value === '' || value === undefined) {
              return ctx.createError({ message: 'Provide an event Name' });
            }
            return true;
          },
        }),
      desc: string().trim().required('You must provide an Event Description'),
      start_date: date()
        .required('You must provide a Start Date')
        .typeError('You must provide a Start Date'),
      end_date: date()
        .required('You must provide an End Date')
        .typeError('You must provide an End Date')
        .min(
          ref('start_date'),
          "End Date cannot be earlier than start date"
        ),
    });

    const result = await eventSchema
      .validate({
        location: fd.get('location'),
        name: fd.get('name'),
        desc: fd.get('desc'),
        start_date: fd.get('start_date'),
        end_date: fd.get('end_date'),
      })
      .catch((e) => {
        console.log(e);
        return 'ERROR';
      });

    if (result === 'ERROR') {
      return ('ERROR');
    } else {
      await http.put(`events/${details.id}/`, fd, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).catch(
        (e) => {console.log(e)} 
      );

      await refetchOrg();
      // if (pathAfterUpdate) {
      //   router.push(pathAfterUpdate);
      // }
    }
  };
  return {
    saveAsDraft,
  };
};
