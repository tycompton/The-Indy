const nodemailer = require('nodemailer');
const { welcome } = require("./welcome_template");
const { purchase } = require("./purchase_template");
require('dotenv').config();

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;
  
  switch(template){
    case "welcome":
      data = {
        from: "<crashbangcompton@hotmail.com>",
        to,
        bcc: "crashbangcompton@hotmail.com",
        subject: `Welcome to The Indy Online ${name}`,
        html: welcome()
      }
    break;
    case "purchase":
      data = {
        from: "<crashbangcompton@hotmail.com>",
        to,
        bcc: "crashbangcompton@hotmail.com",
        subject: `Your Indy Online Order`,
        html: purchase(actionData)
      }
    break;
    default: 
      data;
  } 

  return data;
}

const sendEmail = (to, name, token, type, actionData = null) => {

  const smtpTransport = nodemailer.createTransport({
    service:"Hotmail",
    auth:{
      user: "crashbangcompton@hotmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type, actionData)

  smtpTransport.sendMail(mail, function(error, response){
    if(error){
      console.log(error);
    } else {
      console.log('email sent')
    }
    smtpTransport.close();
  });

}

module.exports = { sendEmail }