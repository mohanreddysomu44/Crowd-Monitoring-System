require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendSms = async (body) => {
  let messageOption = {
    from: process.env.TWILIO_PHONE_NUMBER, // Must be a verified Twilio number
    to: process.env.TO_NUMBER, // Ensure this is a valid phone number
    body, // This is the SMS content
  };

  try {
    const message = await client.messages.create(messageOption);
    console.log("Message Sent Successfully:", message);
  } catch (error) {
    console.error("Error Sending Message:", error.message || error);
  }
};

// Example condition logic
const checkConditionAndSendSms = () => {
  const condition = true; // Replace with your actual condition

  if (condition) {
    sendSms("Condition met! Sending SMS...");
  } else {
    console.log("Condition not met. No SMS sent.");
  }
};

// Call the function where necessary
checkConditionAndSendSms();
