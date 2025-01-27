import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/database/database";
import authRouter from "./features/users/routes/user_route";
dotenv.config();

dbConnection();

const app = express();

app.use(express.json());

app.use("/users", authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
