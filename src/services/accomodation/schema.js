import mongoose from "mongoose";
const { Schema, model } = mongoose;
const AccomodationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    maxGuest: Number,
    city: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default model("accommodation", AccomodationSchema);
