
import { faker } from "@faker-js/faker";
export default (user,count,nameIds,GenderIds,maritalStatusIds,religionIds,raceIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
fullName: faker.datatype.boolean(""),
firstName: faker.datatype.boolean(""),
surname: faker.datatype.boolean(""),
Nationality: faker.datatype.boolean(""),
NRIC: faker.datatype.boolean(""),
dateofBirth: faker.datatype.boolean(""),
Gender: GenderIds[i % GenderIds.length],
maritalStatus: maritalStatusIds[i % maritalStatusIds.length],
religion: religionIds[i % religionIds.length],
race: raceIds[i % raceIds.length],
specialConditions: faker.datatype.boolean(""),
formerSunway: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
