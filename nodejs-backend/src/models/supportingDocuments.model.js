module.exports = function (app) {
  const modelName = "supporting_documents";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: Schema.Types.ObjectId, ref: "users" },
      passportPhoto: {
        type: [Schema.Types.ObjectId],
        ref: "document_storages",
        required: true,
        maxLength: null,
      },
      NRICCopy: {
        type: [Schema.Types.ObjectId],
        ref: "document_storages",
        required: true,
        maxLength: null,
      },
      educationLevel: { type: String, required: true, maxLength: null },
      Qualification: { type: String, required: true, maxLength: null },
      School: { type: String, required: true, maxLength: null },
      academicDocuments: {
        type: [Schema.Types.ObjectId],
        ref: "document_storages",
        minLength: null,
        maxLength: 150,
        index: true,
        trim: true,
      },

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
