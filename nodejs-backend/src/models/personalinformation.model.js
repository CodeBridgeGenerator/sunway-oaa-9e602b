module.exports = function (app) {
  const modelName = "personalinformation";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: Schema.Types.ObjectId, ref: "users" },
      fullName: { type: String, required: true },
      firstName: { type: String, required: true },
      surname: { type: String, required: true },
      Nationality: { type: String, required: true },
      NRIC: { type: String, required: true },
      dateofBirth: { type: Date, required: false },
      Gender: { type: Schema.Types.ObjectId, ref: "gender" },
      maritalStatus: { type: Schema.Types.ObjectId, ref: "marital_status" },
      religion: { type: Schema.Types.ObjectId, ref: "religion" },
      race: { type: Schema.Types.ObjectId, ref: "race" },
      specialConditions: { type: Boolean, required: false },
      formerSunway: { type: Boolean, required: false },

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
