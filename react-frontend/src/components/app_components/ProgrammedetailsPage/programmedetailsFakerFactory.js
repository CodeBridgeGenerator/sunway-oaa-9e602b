
import { faker } from "@faker-js/faker";
export default (user,count,nameIds,campusIds,locationIds,programmelevelIds,programmeIds,intakeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
campus: campusIds[i % campusIds.length],
location: locationIds[i % locationIds.length],
programmelevel: programmelevelIds[i % programmelevelIds.length],
programme: programmeIds[i % programmeIds.length],
intake: intakeIds[i % intakeIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
