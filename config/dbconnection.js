import mongoose from "mongoose";
// crate a function  connecr fo mongo

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `database is connected successfully,${connect.Connection.host},${connect.Connection.name}`
    );
  } catch (error) {
    console.log(`error from db connection ${error}`);
    process.exit(1);
  }
};
