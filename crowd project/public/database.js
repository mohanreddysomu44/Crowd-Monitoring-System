// const Dcount = document.querySelector("#current-count");

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-LVBk44I8p77TUFD6VXCyxXPVZSyHToE",
  authDomain: "crowdmoniter.firebaseapp.com",
  databaseURL:
    "https://crowdmoniter-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crowdmoniter",
  storageBucket: "crowdmoniter.firebasestorage.app",
  messagingSenderId: "552354475577",
  appId: "1:552354475577:web:fdc8021180840c489e27e8",
  measurementId: "G-S8QWZ68VZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const crowdRef = ref(database, "CrowdCount");
console.log("Firebase initialized successfully");

// Set up the listener outside the click handler to always monitor changes
onValue(
  crowdRef,
  (snapshot) => {
    if (snapshot.exists()) {
      const crowdData = Object.values(snapshot.val());

      // // const crowdArray = Object.values(crowdData);
      // console.log("Current crowd data:", crowdData);

      console.log(`crowd data is ${crowdData[crowdData.length - 1]}`);
    } else {
      console.log("No data available");
    }
  },
  (error) => {
    console.error("Error reading data:", error);
  }
);

const submit = document.querySelector(".submit-btn");
submit.addEventListener("click", () => {
  const val = 22; // Replace with actual form data

  push(crowdRef, val)
    .then(() => {
      console.log("Data pushed successfully");
    })
    .catch((error) => {
      console.error("Error pushing data:", error);
    });
});
//display the crowd count in the chats.html file
