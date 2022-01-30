import http from '$lib/http';

class OrgsDataService {
  getAll = () => http.get(`orgs/`);

  getEvents = () => http.get(`events/`);

  get = (id) => http.get(`orgs/${id}/`);

  getByOrgUser = (user) => http.get(`orgs/?user=${user}`);

  create = (data) => http.post(`orgs/`, data);

  update = (id, data) => http.put(`orgs/${id}/`, data);

  delete = (id) => http.delete(`orgs/${id}/`);
}

export default new OrgsDataService();
