const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const dbURL= process.env.MONGO_URL;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with failure
  });

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
});

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = {
  userModel: userModel,
  adminModel: adminModel,
  courseModel: courseModel,
  purchaseModel: purchaseModel
};