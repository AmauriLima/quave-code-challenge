import { check } from "meteor/check";
import { People } from "../../people/people";
import { Meteor } from "meteor/meteor";

export async function checkOut(personId) {
  check(personId, String);
  const person = await People.findOneAsync({ _id: personId });
  if (!person) {
    throw new Meteor.Error('not-found', 'Person not found');
  }
  await People.updateAsync({ _id: personId }, { $set: { checkOutAt: new Date() } });
};

export async function bulkCheckOut(personIds) {
  check(personIds, [String]);
  const people = await People.find({ _id: { $in: personIds } }).fetch();
  if (people.length !== personIds.length) {
    throw new Meteor.Error('not-found', 'Some people not found');
  }
  await People.updateAsync({ _id: { $in: personIds } }, { $set: { checkOutAt: new Date() } });
};