const express = require("express");
const app = express();
const PORT = process.env.PORT || 4500;

//---------------------------------------------------------IMPORTS--------------
const errorHandler = require("./Middleware/handle-errors");
const notFound = require("./Middleware/not-found");
require("express-async-errors");
const { router } = require("./Routes/store-routes");
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
const { config } = require("dotenv");
config();
const { connectToDb } = require("./Database/data-base");
app.get("/", (req, res) => {
  res.send("THIS IS THE STORE API");
});

const startServer = async () => {
  try {
    await connectToDb(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch {
    console.log("Server Error");
  }
};
startServer();
