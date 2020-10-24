const sgMail = require('@sendgrid/mail')
const sendgridApiKey = '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'

sgMail.setApiKey(sendgridApiKey)

const msg = {
  to: 'mukkhtarr@gmail.com', // Change to your recipient
  from: 'dotcomgeek@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js'
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })