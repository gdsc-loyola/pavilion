import { useAdminUser } from '$lib/context/AdminContext';
import http from '$lib/http';
import { useHistory } from 'react-router-dom';

export const useDeleteEvent = (id) => {
  const { accessToken, refetchOrg } = useAdminUser();

  const router = useHistory();

  const deleteEvent = async () => {
    await http.delete(`events/${id}/`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    await refetchOrg();
    router.push('/admin/events');
  };

  return {
    deleteEvent,
  };
};
