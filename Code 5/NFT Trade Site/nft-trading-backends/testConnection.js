const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_CONNECTION_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
}).then(() => {
  console.log("Mongoose connected to MongoDB!");
  mongoose.connection.close();
}).catch(err => console.error('Error connecting to MongoDB:', err));
