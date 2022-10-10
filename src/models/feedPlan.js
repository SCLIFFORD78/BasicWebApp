"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const feedPlanSchema = new Schema({
  name: String,
  volume: Number,
  type: String

});

module.exports = Mongoose.model("FeedPlan", feedPlanSchema);
