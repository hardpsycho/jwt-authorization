class ApiErrors extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static unauthorizedError = () => {
        return new ApiErrors(401, "Пользователь не авторизован")
    }

    static badRequest = (message, errors) => {
        return new ApiErrors(400, message, errors)
    }
}

module.exports = ApiErrors