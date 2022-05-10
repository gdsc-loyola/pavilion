import http from '$lib/http';
import { useEffect } from 'react';
import { useEventDetailsStore } from '../store/useEventDetailsStore';

export const useEvent = (id) => {
  const { clear, details, setDetails } = useEventDetailsStore();

  useEffect(() => {
    if (details.id !== parseInt(id)) {
      clear();
    }
  }, [clear, details.id, id]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await http.get(`events/${id}/`);
      const { data } = response;
      setDetails({
        name: data.name,
        description: data.desc,
        coverphoto: data.cover_photo,
        eventphoto1: data.event_photo1,
        eventphoto2: data.event_photo2,
        eventphoto3: data.event_photo3,
        eventphoto4: data.event_photo4,
        startDate: data.start_date,
        endDate: data.end_date,
        responsesSheet: data.old_respondents,
        formDescription: data.form_description,
        ...data,
        __hasFetched: true,
      });
    };

    if (!details.__hasFetched) {
      fetchEventDetails();
    }
  }, [details.__hasFetched, id, setDetails]);

  return { details };
};
