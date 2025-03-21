const config = require("../config/env");
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: false,
      auth: {
        user: config.smtpUsername,
        pass: config.smtpPassword,
      },
    });

    const mailOptions = {
      from: config.smtpFromEmail,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const sendStudentVerifiedEmail = async ({ email }) => {
  try {
    await sendEmail({
      to: email,
      subject: "Student Verification Successful",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Student Verification Successful</title>
          <style>
            body {
              color: #081e7f;
              font-family: Arial, sans-serif;
              background-color: #ffffff;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            .logo {
              width: 210px;
            }
            .content {
              font-size: 16px;
              color: rgba(8, 30, 127, 0.602);
            }
            .btn-container {
              text-align: center;
              margin-top: 20px;
            }
            .btn {
              background-color: #081e7f;
              border: none;
              padding: 12px 24px;
              border-radius: 5px;
              cursor: pointer;
              display: inline-block;
            }
            .btn a {
              text-decoration: none;
              color: white;
              font-size: 16px;
              font-weight: bold;
              display: inline-block;
            }
            .btn:hover {
              background-color: rgba(8, 30, 127, 0.602);
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <img src="${config.logoURL}" alt="Logo" class="logo" />
            <h2>ElevateHire - Placement Made Easy</h2>
            <h3>Student Verification Successful</h3>
            <p class="content">
              Your student details have been successfully verified. You are now
              validated in our system.
              <br /><br />
              If you have any questions or need further assistance, feel free to reach
              out to our support team.
              <br /><br />
              <button class="btn">
                <a href="${config.frontendURL}">Go to Portal</a>
              </button>
              <br /><br />
              Thank you,<br />
              <strong>Team ElevateHire</strong>
            </p>
          </div>
        </body>
      </html>`,
    });
    console.log(`Successfully sent student verified email (${email})`);
  } catch (error) {
    console.error(`Failed to send student verified email (${email})`);
  }
};

const sendQueryReplyEmail = async ({ email, query, reply }) => {
  try {
    await sendEmail({
      to: email,
      subject: "Query Reply",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Query Reply</title>
          <style>
            body {
              color: #081e7f;
              font-family: Arial, sans-serif;
              background-color: #ffffff;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            .logo {
              width: 100px;
            }
            .content {
              font-size: 16px;
              color: rgba(8, 30, 127, 0.602);
              text-align: center;
            }
            .query-box,
            .reply-box {
              background: #f4f4f4;
              color: rgba(8, 30, 127, 0.602);
              padding: 10px;
              border-left: 4px solid #081e7f;
              margin: 10px 0;
              font-style: italic;
            }
            .btn-container {
              text-align: center;
              margin-top: 20px;
            }
            .btn {
              background-color: #081e7f;
              border: none;
              padding: 12px 24px;
              border-radius: 5px;
              cursor: pointer;
              display: inline-block;
            }
            .btn a {
              text-decoration: none;
              color: white;
              font-size: 16px;
              font-weight: bold;
              display: inline-block;
            }
            .btn:hover {
              background-color: rgba(8, 30, 127, 0.602);
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <img src="${config.logoURL}" alt="Company Logo" class="logo" />
            <h2>Pune Institute of Computer Technology</h2>
            <h3>Reply to Your Query</h3>
            <p class="content">
              Your query has been reviewed and replied by the Training & Placement
              team.
            </p>
            <strong>Your Query:</strong>
            <div class="query-box">${query}</div>
            <strong>Admin's Reply:</strong>
            <div class="reply-box">${reply}</div>
            <br />
            If you have further concerns, feel free to raise another query.
            <br /><br />
            <button class="btn">
              <a href="${config.frontendURL}">Go to Portal</a>
            </button>
            <br /><br />
            Thank you,<br />
            <strong>Training and Placement Department, PICT</strong>
          </div>
        </body>
      </html>`,
    });
    console.log(`Successfully sent query reply email (${email})`);
  } catch (error) {
    throw new Error(`Failed to send query reply email (${email})`);
  }
};

module.exports = { sendEmail, sendStudentVerifiedEmail, sendQueryReplyEmail };
