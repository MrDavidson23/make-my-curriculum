const nodemailer = require("nodemailer")

const smtpTransport = nodemailer.createTransport({
  host: "ns2.plataformaelectronicacr.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.smtpusername,
    pass: process.env.smtppassword,
  },
})

module.exports = {
  sendMail: async (req, res) => {
    const mailOptions = req
    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error)
        res.status(500).send("Error al enviar el correo")
      } else {
        console.log("Correo enviado")
        res.status(200).send("Correo enviado")
      }
    })
  },
}
