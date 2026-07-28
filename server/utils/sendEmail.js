const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // Configuracion del transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Mi correo de gmail
            pass: process.env.EMAIL_PASS  // App password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;