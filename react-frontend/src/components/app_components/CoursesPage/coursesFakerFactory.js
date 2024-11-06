import { faker } from "@faker-js/faker";
export default (
  user,
  count,
  campusIds,
  locationIds,
  programmelevelIds,
  intakeIds,
  schoolIds,
) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      campus: campusIds[i % campusIds.length],
      location: locationIds[i % locationIds.length],
      programmelevel: programmelevelIds[i % programmelevelIds.length],
      programme: faker.lorem.sentence(1),
      intake: intakeIds[i % intakeIds.length],
      school: schoolIds[i % schoolIds.length],

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
