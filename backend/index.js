const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors'); // Import CORS
const authRoutes = require('./routes/Auth');

const app = express();
dotenv.config();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully...");
    })
    .catch((error) => {
        console.log(error);
    });

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.use('/api', authRoutes); 

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}...`);
});