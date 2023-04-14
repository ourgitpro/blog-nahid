const expressAsyncHandler = require("express-async-handler");

const EmailMsg = require("../../model/EmailMessaging/EmailMessaging");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const Filter = require("bad-words");
const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const { to, subject, message } = req.body;
  //get the message
  const emailMessage = subject + " " + message;
  //prevent profanity/bad words
  const filter = new Filter();

  const isProfane = filter.isProfane(emailMessage);
  if (isProfane)
    throw new Error("Email sent failed, because it contains profane words.");
  try {
    
    let config = {
      service: "gmail",
      auth: {
        user: "nahidhossain124@gmail.com",
        pass: "xqdsdplmpwcgknkf",
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Blog App",
        link: "https://www.facebook.com/mdnahidhossain.eblo/",
      },
    });
   
    let response = {
      body: {
        name:"Please Read This Email",
        intro:`${message}`,
       

      },
    };

    let mail = MailGenerator.generate(response);

    let msg = {
      
      to,
      subject,
      html: mail,
    };
    await transporter.sendMail(msg);
    //build your message
    //const msg = {
    //to: "mdnahidhossaineblo@gmail.com",

    //from: "mdnahidhossaineblo@gmail.com",
    // subject: "My first Node js email sending",
    //text: "Hey check me out for this email",
    //};

    // await sgMail.send(msg);
    res.json('mail send');
    await EmailMsg.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      message,
      subject,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = { sendEmailMsgCtrl };
