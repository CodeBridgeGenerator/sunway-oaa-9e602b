
    module.exports = function (app) {
        const modelName = 'contact_information';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type: Schema.Types.ObjectId, ref: "users" },
fullCorrespondenceAddress: { type:  String , required: true, maxLength: null },
city: { type:  String , maxLength: null },
postalCode: { type:  String , maxLength: null },
state: { type:  String , required: true, maxLength: null },
country: { type:  String , required: true, minLength: null, maxLength: null },
studentMobileNumber: { type:  String , required: true, minLength: null, maxLength: null },
homeContactNumber: { type:  String , minLength: null, maxLength: null },
studentemail: { type:  String , required: true, minLength: null, maxLength: null },
permanentAddress: { type:  String , required: true, minLength: null, maxLength: null },
parentGuardianName: { type:  String , required: true, minLength: null, maxLength: null },
relationship: { type: Schema.Types.ObjectId, ref: "relationship" },
parentGuardianNumber: { type:  String , required: true, minLength: null, maxLength: null },
parentGuardianEmail: { type:  String , required: true, minLength: null, maxLength: null },
parentGuardianOfficeNumber: { type:  String , required: true, minLength: null, maxLength: null },
monthlyHouseholdIncome: { type:  String , required: true, minLength: null, maxLength: null },
emergencyContactName: { type:  String , required: true, minLength: null, maxLength: null },
emergencyContactNumber: { type:  String , required: true, minLength: null, maxLength: null },
emergencyContactRelationship: { type: Schema.Types.ObjectId, ref: "relationship" },
emergencyContactEmail: { type:  String , required: true, maxLength: null },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };