import instance from "../API/instance";

class AuthService {
    static login = async (email, password) => {
        return instance.post("/login", {
            email,
            password
        })
    }

    static registration = async (email, password) => {
        return instance.post("/registration", {
            email,
            password
        })
    }

    static logout = async () => {
        return instance.post("/logout")
    }
}

export default AuthService