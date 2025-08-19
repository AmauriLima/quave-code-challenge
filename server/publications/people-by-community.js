import { People } from "../../people/people";
import { check } from "meteor/check";

export function publishPeopleByCommunity(communityId) {
  check(communityId, String);
  return People.find({ communityId }, {
    fields: {
      firstName: 1,
      lastName: 1,
      title: 1,
      companyName: 1,
      communityId: 1,
      checkInAt: 1,
      checkOutAt: 1,
    },
    sort: { lastName: 1, firstName: 1 },
  });
}