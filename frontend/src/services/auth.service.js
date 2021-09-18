import http from "../http-common"

class AuthDataService {
    
    register = (username) => http.post("register/", {username: username});

    login = (username) => http.post("login/", {username: username, password: "9,2Nli1H:C&Vmyl<9:Y)VV1t[jQN7rS7Laf|sip*]X_Fi)IX5"})

    signout = () => http.post('logout/')

}

export default new AuthDataService();