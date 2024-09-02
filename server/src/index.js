import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

app.use("/", (req, res) => {
  res.send("Hallo");
});

mongoose.connect(
  "mongodb+srv://anwarudin:Closeup123!@recipes.3it4m.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Koneksi MongoDB gagal:"));
db.once("open", function () {
  console.log("Terhubung ke MongoDB!");
});

app.listen(8000, () => console.log("Server started...."));
