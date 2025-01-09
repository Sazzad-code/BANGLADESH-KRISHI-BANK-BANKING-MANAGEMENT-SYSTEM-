const express = require('express');
const cors = require("cors");
const app = express();

require('dotenv').config();

// Enable CORS for your frontend's origin
app.use(cors({ origin: "http://localhost:5173" }));

// Alternatively, enable CORS for all origins (use cautiously in production)
app.use(cors());
app.use(express.json())

const dbConfig = require('./config/dbConfig');
const usersRoute = require('./routes/usersRoute');


app.use('/api/users', usersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});