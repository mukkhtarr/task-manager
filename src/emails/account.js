const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=>{
  sgMail
  .send({
    to: email, // Change to your recipient
    from: 'dotcomgeek@gmail.com', // Change to your verified sender
    subject: 'Welcome to Task Manager App',
    text:`Hi ${name}, welcome to my task manager app`
  })
}
const sendGoodByeEmail = (email, name)=>{
  sgMail
  .send({
    to: email, // Change to your recipient
    from: 'dotcomgeek@gmail.com', // Change to your verified sender
    subject: `Good bye, ${name}`,
    text:`sorry to hear you are leaving ${name}, Is ther we could have done to keep you as our user?`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendGoodByeEmail
}