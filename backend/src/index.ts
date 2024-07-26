import express, { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelsRoutes from "./routes/my-hotels";
import hotelsRoutes from "./routes/hotels";
import myBookingsRoutes from "./routes/my-bookings";
import adminRoutes from "./routes/admin";
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

//define the fontend folder to be served by default(this mean backend end and frontend served from the same server)
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelsRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/my-bookings", myBookingsRoutes);
app.use("/api/admin/hotels", adminRoutes);

//non-API routes are redirected to your frontend (common practice for SPA)
// thsi make react-router-dom handle the request for us
app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(3000, () => {
  console.log(`${process.env.NODE_ENV} mode , running on port 3000`);
});
