import { check } from "meteor/check";
import { People } from "../../people/people";
import { Meteor } from "meteor/meteor";

export async function checkIn(personId) {
  check(personId, String);
  const person = await People.findOneAsync({ _id: personId });
  if (!person) {
    throw new Meteor.Error('not-found', 'Person not found');
  }
  await People.updateAsync({ _id: personId }, {
    $set: { checkInAt: new Date() },
    $unset: { checkOutAt: 1 },
  });
};