import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const url = process.env.MONGOOSE_URI;

    if (!url) {
      throw new Error("MONGO_URI not defined");
    }

    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (e: any) {
    console.log(e.message);
    process.exit(1);
  }
};

export default dbConnection;
