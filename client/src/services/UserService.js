import instance from "../API/instance";

class UserService {
    static fetchUsers = async () => {
        return instance.get("/users")
    }
}

export default UserService