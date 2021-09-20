const TOKEN_KEY = "auth-token"

class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb) {
        this.authenticated = true
        window.sessionStorage.setItem("isAuth", this.authenticated)
        cb()
    }

    logout(cb) {
        this.authenticated = false
        cb()
    }

    isAuthenticate() {
        console.log("ISAUTH: ", window.sessionStorage.getItem("isAuth"))
        return window.sessionStorage.getItem("isAuth")
    }

    saveToken = (token) => {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }
      
    getToken = () => {
        return sessionStorage.getItem(TOKEN_KEY);
    }
}

export default new Auth()