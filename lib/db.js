// mongoose.js

import mongoose from 'mongoose'
 
let isConnected = false; // Variable to track the connection status
const MONGODB_URI = "mongodb+srv://SafeMove:1234567890@cluster0.t9y7ahh.mongodb.net/?retryWrites=true&w=majority";

export const dbConnect = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  if (!MONGODB_URI) return console.log("Missing MongoDB URL");

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);

    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
  } catch (error) {
    console.log('error',error);
  }
};

