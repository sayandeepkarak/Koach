import { connect, set } from "mongoose";

async function connectDatabase(uri) {
  set("strictQuery", false);
  try {
    await connect(uri);
    console.log("Database connected successfully");
  } catch (err) {
    // console.log(err);
    console.log("Database connection failed");
  }
}

export default connectDatabase;
