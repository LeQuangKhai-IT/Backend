import nodemailer from 'nodemailer';

export const sendEmail = async (data) => {

    return new Promise(async (resolve, reject) => {
        let sendData = {}
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'lqktn70@gmail.com', // generated ethereal user
                pass: 'bdxkldppiexmwapq', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${data.nameFrom} 👻" <lqktn70@gmail.com>`, // sender address
            to: 'lqktn70@gmail.com', // list of receivers
            subject: "Lịch hẹn", // Subject line
            html: `<h6> Xin chào${' ' + data.nameTo}</6>  <br> <br>
           ${data.content} <br>  <br>
           Time send : ${data.time}`, // html body
        });

        sendData.errCode = 0;
        sendData.errMessage = "Send email success!";
        resolve(sendData)
    })
}
