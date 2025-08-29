// // // const express = require("express");
// // const path = require("path");
// // // const app = express();
// // // const port = 3000;

// // // app.use(express.static(path.join(__dirname, "public")));
// // // app.get("/", (req, res) => {
// // //   res.sendFile("./public/chat.html");
// // // });
// // // app.get("/index1.html", (req, res) => {
// // //   res.sendFile("./public/index1.html");
// // // });
// // // app.get("/login.hmtl", (req, res) => {
// // //   res.sendFile("./public/login.html");
// // // });
// // // app.listen(port, () => {
// // //   console.log(`Example app listening at http://localhost:${port}`);
// // // });
// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");

// // const app = express();
// // const port = 3000;

// // let crowdCount = 0; // Variable to store crowd count

// // // Middleware
// // app.use(bodyParser.json());
// // app.use(cors());

// // app.get("/", (req, res) => {
// //   res.sendFile("chats.html");
// // });
// // // POST endpoint to receive data from Arduino
// // app.post("/count", (req, res) => {
// //   const arduinoIP = req.headers["x-arduino-ip"]; // Get Arduino's IP address from the header
// //   console.log(`Request received from Arduino IP: ${arduinoIP}`);

// //   crowdCount++; // Increment crowd count
// //   console.log(`Crowd count updated: ${crowdCount}`);
// //   res.status(200).send({ message: "Count updated", count: crowdCount });
// // });

// // // GET endpoint to fetch crowd count
// // app.get("/data", (req, res) => {
// //   res.status(200).send({ count: crowdCount });
// // });

// // // Start the server
// // app.listen(port, "192.168.17.116", () => {
// //   console.log(`Server running at http://192.168.17.116:${port}`);
// // });
// // import crowdData from "./public/database";
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const port = 3000;

// let crowdCount = 0; // Variable to store crowd count

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// const sendSms = async (body) => {
//   let messageOption = {
//     from: process.env.TWILIO_PHONE_NUMBER, // Verified Twilio number
//     to: process.env.TO_NUMBER, // Recipient phone number
//     body, // SMS content
//   };

//   try {
//     const message = await client.messages.create(messageOption);
//     console.log("Message Sent Successfully:", message);
//   } catch (error) {
//     console.error("Error Sending Message:", error.message || error);
//   }
// };

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.sendFile("chats.html");
// });

// // POST endpoint to receive data from Arduino
// app.post("/count", (req, res) => {
//   const arduinoIP = req.headers["x-arduino-ip"]; // Get Arduino's IP address from the header
//   console.log(`Request received from Arduino IP: ${arduinoIP}`);

//   crowdCount++; // Increment crowd count
//   // crowdCount(crowdCount)
//   console.log(`Crowd count updated: ${crowdCount}`);

//   // Check condition and send SMS if crowdCount exceeds 3
//   if (crowdCount == 9) {
//     sendSms(
//       `Alert: Crowd count has exceeded the limit! Current count: ${crowdCount}`
//     );
//   }

//   res.status(200).send({ message: "Count updated", count: crowdCount });
// });

// // GET endpoint to fetch crowd count
// app.get("/data", (req, res) => {
//   res.status(200).send({ count: crowdCount });
// });
// console.log(accountSid);
// // Start the server
// app.listen(port, "192.168.48.116", () => {
//   console.log(`Server running at http://192.168.48.116:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

let currentCount = 0;
let totalExits = 0;

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSms = async (body) => {
  const messageOption = {
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.TO_NUMBER,
    body,
  };

  try {
    const message = await client.messages.create(messageOption);
    console.log("SMS sent:", message.sid);
  } catch (error) {
    console.error("SMS error:", error.message);
  }
};

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST endpoint for count updates
app.post("/count", (req, res) => {
  const { event, count } = req.body;
  const arduinoIP = req.headers["x-arduino-ip"] || req.ip;

  console.log(`Request from ${arduinoIP}:`, req.body);

  // Update counts based on event type
  if (event === "entry") {
    currentCount = count;
    console.log(`Entry - Count: ${currentCount}`);
  } else if (event === "exit") {
    currentCount = count;
    totalExits++;
    console.log(`Exit - Count: ${currentCount}, Total Exits: ${totalExits}`);
  }

  // Send SMS alert if crowd limit reached
  if (currentCount == 9) {
    sendSms(`Crowd Alert! Current count: ${currentCount}`);
  }

  res.status(200).json({
    message: "Count updated",
    currentCount,
    totalExits,
  });
});

// GET endpoint for current data
app.get("/data", (req, res) => {
  res.status(200).json({
    currentCount,
    totalExits,
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

// Start server
app.listen(port, "192.168.216.116", () => {
  console.log(`Server running at http://192.168.216.116:${port}`);
  console.log("Waiting for Arduino connections...");
});
