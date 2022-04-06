const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || "3000";
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.models");
const jwt = require("jsonwebtoken");

/* const generateToken = (id) => { Duplicate with client side code
  return jwt.sign({ id }, process.env.JWT_SCRET, {
    expiresIn: "30d",
  });
}; */

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://neuroearstest.s3-website.ap-northeast-2.amazonaws.com",
    ],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

mongoose.connect(
  "mongodb+srv://nick0726:qweR1234@cluster0.yzv2q.mongodb.net/neuroears?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const http = require("http").createServer(app);
http.listen(port, () => {
  console.log(`${port}에 서버 오픈 완료`);
});

app.use("/", express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      id: req.body.id,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      // token: generateToken(req.body.id),
    });
    // var temp = User.create();
    // console.log(temp);
    res.json({ status: "ok" });
  } catch (err) {
    // console.log(err);
    res.json({ status: "error", error: "Duplicate id or email" });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    id: req.body.id,
    password: req.body.password,
    // token: generateToken(req.body.id),
  });

  if (user) {
    const token = jwt.sign(
      {
        id: req.body.id,
        email: req.body.email,
        // token: generateToken(user.id),
      },
      `scret${dotenv.JWT_SCRET}`
    );
    return res.json({
      status: "ok",
      user: token,
    });
  } else {
    return res.json({
      status: "error",
      user: false,
    });
  }
});

app.get("/login", async (req, res) => {
  const token = req.headers["x-acces-token"];

  try {
    const decoded = jwt.verify(token, `scret${dotenv.JWT_SCRET}`);
    const id = decoded.id;
    // const user = await User.findOne({ id: id });
    return { status: "ok" /*quote: user.quote */ };
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }

  const user = await User.findOne({
    id: req.body.id,
    password: req.body.password,
    // token: generateToken(req.body.id),
  });

  if (user) {
    const token = jwt.sign(
      {
        id: req.body.id,
        email: req.body.email,
        // token: generateToken(user.id),
      },
      `scret${dotenv.JWT_SCRET}`
    );
    return res.json({
      status: "ok",
      user: token,
    });
  } else {
    return res.json({
      status: "error",
      user: false,
    });
  }
});

app.get("/mainpage", async (req, res) => {
  const user = await User.findOne({
    id: req.body.id,
    password: req.body.password,
    // token: generateToken(req.body.id),
  });

  if (user) {
    const token = jwt.sign(
      {
        id: req.body.id,
        email: req.body.email,
        // token: generateToken(user.id),
      },
      `scret${dotenv.JWT_SCRET}`
    );
    return res.json({
      status: "ok",
      user: token,
    });
  } else {
    return res.json({
      status: "error",
      user: false,
    });
  }
});

app.post("/mainpage", async (req, res) => {
  const token = req.headers["x-acces-token"];

  try {
    const decoded = jwt.verify(token, `scret${dotenv.JWT_SCRET}`);
    const id = decoded.id;
    const user = await User.updateOne(
      { id: id }
      // { $set: { quote: req.body.quote } }
    );
    return { status: "ok" };
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
