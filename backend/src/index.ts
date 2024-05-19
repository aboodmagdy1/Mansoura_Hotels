import express, { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/hotels";
import path from "path";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// connect to DB vefore every thing
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => console.log(error.message));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//define the fontend folder to be served by default
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", hotelRoutes);

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
