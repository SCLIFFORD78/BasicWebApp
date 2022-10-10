"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const calfSchema = Schema({
  breed: String,
  DOB: Date,
  tag: String,
  //feedPlan: String
  feedPlan: {
    type: Schema.Types.ObjectId,
    ref: "FeedPlan",
  }
});

module.exports = Mongoose.model("Calf", calfSchema);
