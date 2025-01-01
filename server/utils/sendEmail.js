import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: "zalaravindrasinh026@gmail.com", pass: "yxqs agvn ivru lwuq" },
});
  
export const sendEmail = async (email, subject, text) => {
    await transporter.sendMail({
        from: "zalaravindrasinh026@gmail.com",
        to: email,
        subject: subject,
        text: text,
    });
};
