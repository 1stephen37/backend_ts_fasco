import nodemailer from 'nodemailer';
import environment from "../constants";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: environment.email,
        pass: environment.emailPassword,
    },
});

export default transporter;

