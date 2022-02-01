import http from '$lib/http';

class EventsDataService {
  getAll = () => http.get('events/');

  get = (id) => http.get(`events/${id}/`);

  create = (data) => http.post('events/', data);

  update = (id, data) => http.put(`events/${id}/`, data);

  delete = (id) => http.delete(`events/${id}/`);
}

export default new EventsDataService();
