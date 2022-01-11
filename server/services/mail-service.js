class MailService {
    sendActivationLink = (email, link) => {
        console.log("Отправляем email")
    }
}

module.exports = new MailService()