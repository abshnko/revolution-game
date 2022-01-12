import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import questionRoutes from "./routes/questions.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static(__dirname));

app.use("/questions", questionRoutes);
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("client/public/index.html"));
// });

//FIX!!! STORE IN ENV VARIABLES FOR SECURITY !!!
const CONNECTION_URL =
  "mongodb+srv://dasha:revolution@revolution-game.utmc5.mongodb.net/Revolution-Game?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);

app.get("/api", (req, res) => {
  res.json({ hi: "hello from server" });
});
