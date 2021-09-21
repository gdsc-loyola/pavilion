import http from "../http-common"

class AuthDataService {
    
    register = (email) => http.post("register/", {username: email});

    login = (email) => http.post("login/", {username: email, password: "9,2Nli1H:C&Vmyl<9:Y)VV1t[jQN7rS7Laf|sip*]X_Fi)IX5"})

    signout = () => http.post("logout/")

    get = (email) => http.get(`users/?user=${email}`)

}

export default new AuthDataService();