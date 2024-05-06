import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";

// connect to DB vefore every thing
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => console.log(error.message));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
