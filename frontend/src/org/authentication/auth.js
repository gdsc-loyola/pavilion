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
}

export default new Auth()