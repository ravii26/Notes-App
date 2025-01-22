import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: "", pass: "" },
});
  
export const sendEmail = async (email, subject, text) => {
    await transporter.sendMail({
        from: "",
        to: email,
        subject: subject,
        text: text,
    });
};
