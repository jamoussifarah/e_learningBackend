import mongoose from "mongoose";
console.log("ftftf");
const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/e_learning", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connected Successfully");
  } catch (error) {
    console.error(`Error Connecting to DataBase : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
