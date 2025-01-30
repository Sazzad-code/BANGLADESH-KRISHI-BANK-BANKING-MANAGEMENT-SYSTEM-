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
const transactionsRoute = require('./routes/transactionsRoute');
const loansRoute = require('./routes/loansRoute');



app.use('/api/users', usersRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/loans', loansRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});