const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const authRou = require("./routes/authRou");
const guestRou = require("./routes/guestRou");
const bookingRou = require("./routes/bookingRou");
const favouriteRou = require("./routes/favouriteRou");
const hostRou = require("./routes/hostRou");
const connectToMongoDB = require("./mongoConnect/connectToMongoDB");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();



const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.use("/api/auth", authRou);
app.use("/api/guest", guestRou);
app.use("/api/bookings", bookingRou);
app.use("/api/favourites", favouriteRou);
app.use("/api/host", hostRou);

app.use(express.static(path.join(_dirname, "frontend", "dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, () => {
  connectToMongoDB();
});
