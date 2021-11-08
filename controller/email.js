const nodemailer = require("nodemailer")
const pug = require("pug")
const juice = require("juice")
const htmlToText = require("html-to-text")
const util = require("util")
const emailConfig = require("../config/email")


let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
    },
});

const generarHtml = (archivo, opcion= {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opcion);
    return juice(html);
}

const enviar = async (opciones) => {
    const html = generarHtml(opciones.archivo, opciones);
    const text = htmlToText.fromString(html)
    let opcionesEmail = {
        from: "Uptask <no-reply@uptask.com>",
        to: opciones.usuario.email,
        subject: opciones.subject,
        text,
        html 
    };

    const enviarEmail = util.promisify(transporter.sendMail, transporter);
    return enviarEmail.call(transporter, opcionesEmail);
}

module.exports = {enviar}

