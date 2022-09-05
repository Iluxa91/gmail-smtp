const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.post("/sendMessage", async function (req, res) {
    let {name, email, message} = req.body.data

    // send mail with defined transport object
    await transporter.sendMail({
        from: "MY PORTFOLIO PAGE", // sender address
        to: "iluxakiselev91@gmail.com", // list of receivers
        subject: "HR WANTS ME", // Subject line
        // text: 'Hello world, man!', // plain text body
        html: `<b>Сообщение с вашего PORTFOLIO PAGE</b>
            <div>
            name: ${name}
            </div>
            <div>
            contacts: ${email}
            </div>
            <div>${message}</div>`, // html body
    });
    res.send("ok")
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
    console.log("Example app listening on port 3010!");
});