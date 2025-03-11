import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "EcommerceWebsite",

        });

        console.log("Mongo Db connected successfully.")
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;