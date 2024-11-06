module.exports = function (app) {
  const modelName = "programmedetails";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: Schema.Types.ObjectId, ref: "users" },
      campus: { type: Schema.Types.ObjectId, ref: "campus" },
      location: { type: Schema.Types.ObjectId, ref: "location" },
      programmelevel: { type: Schema.Types.ObjectId, ref: "programmelevel" },
      programme: { type: Schema.Types.ObjectId, ref: "courses" },
      intake: { type: Schema.Types.ObjectId, ref: "intake" },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
