import express from "express";
import FormData from "form-data";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
// import dotenv from "dotenv"
// import {} from "dotenv/config";
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const vars = {
  client_id: "f7190371b5eced9fb9a0",
  client_secret: "e6dff5cf0c6d04998023e87c063219d493ccfae6",
  redirect_uri: "http://localhost:3000/login",
  SERVER_PORT: 5000,
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/authenticate", (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", vars.client_id);
  data.append("client_secret", vars.client_secret);
  data.append("code", code);
  data.append("redirect_uri", vars.redirect_uri);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
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

// const PORT = process.env.SERVER_PORT || 5000;
const PORT = vars.SERVER_PORT;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
