import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
