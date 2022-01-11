const nodemailer = require("nodemailer")

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Yandex', // no need to set host or port etc.
            auth: {
                user: process.env.SMTP_USER_MAIL,
                pass: process.env.SMTP_USER_PASSWORD
            }


        })
    }

    sendActivationLink = async (email, link) => {
        await this.transporter.sendMail({
            from: "jwt-mail@yandex.ru",
            to: email,
            subject: "ACCOUNT ACTIVATION",
            text: "",
            html:
                `
                    <div><h1><a href="${link}">${link}</a></h1></div>
                `
        })
    }
}

module.exports = new MailService()


/*

jwt-mail@yandex.ru
fds87fs7d8sfdFf2

jwt - rrkixxomycwyzgda


почта для приема;
jwt-mail-test@yandex.ru
fds87fs7d8sfdFf2

 */