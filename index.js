const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

const CONNECTION_URL =
  "mongodb+srv://iid007:iid007.123@cluster0.3hpnbbx.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server is running ${PORT}`)))
  .catch((error) => console.log(error.message));
