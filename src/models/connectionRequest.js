const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["interested", "ignored", "accepted", "rejected"],
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  // CHECK IF TO USER ID IS SAME AS FROM USER ID
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
});

const ConnectionRequestModel = model(
  "ConnectionRequestModel",
  connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
