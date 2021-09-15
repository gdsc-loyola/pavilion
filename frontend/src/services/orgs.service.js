import http from "../http-common"

class OrgsDataService {
    
    get = (userId) => http.get(`orgs/?user=${userId}`);
    
    create = (data) => http.post("orgs/", data);

    update = (id, data) => http.put(`orgs/${id}/`, data);

    delete = (id) => http.delete(`orgs/${id}/`);

}

export default new OrgsDataService();