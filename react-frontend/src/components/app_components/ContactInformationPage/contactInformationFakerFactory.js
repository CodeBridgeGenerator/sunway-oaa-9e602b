
import { faker } from "@faker-js/faker";
export default (user,count,nameIds,relationshipIds,emergencyContactRelationshipIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
fullCorrespondenceAddress: faker.lorem.sentence(""),
city: faker.lorem.sentence(""),
postalCode: faker.lorem.sentence(""),
state: faker.lorem.sentence(""),
country: faker.lorem.sentence(""),
studentMobileNumber: faker.lorem.sentence(""),
homeContactNumber: faker.lorem.sentence(""),
studentemail: faker.lorem.sentence(""),
permanentAddress: faker.lorem.sentence(""),
parentGuardianName: faker.lorem.sentence(""),
relationship: relationshipIds[i % relationshipIds.length],
parentGuardianNumber: faker.lorem.sentence(""),
parentGuardianEmail: faker.lorem.sentence(""),
parentGuardianOfficeNumber: faker.lorem.sentence(""),
monthlyHouseholdIncome: faker.lorem.sentence(""),
emergencyContactName: faker.lorem.sentence(""),
emergencyContactNumber: faker.lorem.sentence(""),
emergencyContactRelationship: emergencyContactRelationshipIds[i % emergencyContactRelationshipIds.length],
emergencyContactEmail: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
