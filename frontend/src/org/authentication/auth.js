class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb) {
        this.authenticated = true
        window.localStorage.setItem("isAuth", this.authenticated)
        cb()
    }

    logout(cb) {
        this.authenticated = false
        cb()
    }

    isAuthenticate() {
        console.log("ISAUTH: ", window.localStorage.getItem("isAuth"))
        return window.localStorage.getItem("isAuth")
    }
}

export default new Auth()