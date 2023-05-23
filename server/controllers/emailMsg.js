const sgMail = require("@sendgrid/mail")
const EmailMessaging = require("../models/EmailMessaging")
const Filter = require("bad-words")

exports.sendEmailMsg = async (req, res) => {
    try {
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
        const { to, subject, message } = req.body

        const filter = new Filter()
        const emailMessage = subject + " " + message;
        const isProfane = filter.isProfane(emailMessage)

        if (isProfane) {
            return res.status(400).json("Sending email failed because it contains bad words.")
        }

        const msg = {
            to,
            subject,
            text: message,
            from: "chimnanivivek14@gmail.com"
        }
        await sgMail.send(msg)
        await EmailMessaging.create({
            to,
            subject,
            message,
            from: req.user.email,
            sentBy: req.user._id
        })
        return res.json("Email sent")
    } catch (error) {
        res.status(500).json("Something went wrong, please try again!")
    }
}