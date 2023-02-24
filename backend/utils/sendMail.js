const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    secure: false, 
    service: "gmail",
                    auth: {
                        user: `${process.env.EMAIL_ADDRESS}`, // generated ethereal user
                        pass: `${process.env.EMAIL_PSSWD}`, // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                }
  });

  console.log(options.email);
  const mailOptions = {
    from: `${process.env.EMAIL_ADDRESS}`,
    to: `${options.email}`,
    subject: options.subject,
    text: options.message,
  };

    transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
        console.log("There was an error: ", err);
    } else {
        console.log("There you Go: ", response);
        return res.status(200).json("Recovery email sent");
    }
});
};

module.exports = sendEmail;