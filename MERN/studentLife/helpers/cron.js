var CronJob = require('cron').CronJob;
const fod = require("./trigger");




var job = new CronJob('* * * * *', async function () {
  console.log("Running");

  const sgMail = require('@sendgrid/mail');
  require('dotenv').config();
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'hnagri52@gmail.com',
    from: 'hznagri@uwaterloo.ca',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  try {
    await sgMail.send(msg);
    console.log("sent");
  } catch (error) {
    console.log(error);
  }


  console.log("Finished");
}, null, true, 'America/Los_Angeles');
job.start();
