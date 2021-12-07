import express from "express";
import FormData from "form-data";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/authenticate", (req, res) => {
  const { code } = req.body;

  // const data = new FormData();
  // data.append("client_id", process.env.client_id);
  // data.append("client_secret", process.env.client_secret);
  // data.append("code", code);
  // data.append("redirect_uri", process.env.redirect_uri);
  const data = {
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    code: code,
    redirect_uri: process.env.redirect_uri,
  };
  fetch(
    `https://github.com/login/oauth/access_token?client_id=${data.client_id}&client_secret=${data.client_secret}&code=${data.code}&redirect_uri=${data.redirect_uri}`,
    {
      method: "POST",
      // body: data,
      headers: {
        accept: "application/json",
      },
    }
  )
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(JSON.parse(paramsString));
      const access_token = params.get("access_token");
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

const PORT = process.env.server_port || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
