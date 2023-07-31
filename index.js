// index.js
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/tasks");
const sequelize = require("./config/db");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/", taskRoutes);

// Start the server
sequelize
    .sync() // This will create the database table(s) based on the model definition(s)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });
