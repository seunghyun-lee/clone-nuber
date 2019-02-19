import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "https://api.mailgun.net/v3/sandboxa5fbab9c07994cbf99a3ef649ccffdb5.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
    const emailData = {
        from: "kerberos4667@gmail.com",
        to: "kerberos4667@gmail.com",
        subject,
        html
    };
    return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
    return sendEmail(emailSubject, emailBody);
};