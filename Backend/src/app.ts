import express from "express";
import bodyParser from "body-parser";
const app = express();

const petRoutes = require("./routes/pets");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  (
    req: any,
    res: { setHeader: (arg0: string, arg1: string) => void },
    next: () => void
  ) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  }
);

app.use("/api/pets", petRoutes);

module.exports = app;
