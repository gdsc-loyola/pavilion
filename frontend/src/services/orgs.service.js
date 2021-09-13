import http from "../http-common"

class OrgsDataService {
    
    getAll = () => http.get("orgs/");
    
    get = (id) => http.get(`orgs/${id}/`);
    
    create = (data) => http.post("orgs/", data);

    update = (id, data) => http.put(`orgs/${id}/`, data);

    delete = (id) => http.delete(`orgs/${id}/`);

}

export default new OrgsDataService();