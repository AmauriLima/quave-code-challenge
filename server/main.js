import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { publishCommunities } from './publications/communities';
import { publishPeopleByCommunity } from './publications/people-by-community';
import { checkIn } from './methods/check-in';
import { checkOut } from './methods/check-out';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();
});

Meteor.publish('communities', publishCommunities);

Meteor.publish('people.byCommunity', publishPeopleByCommunity);

Meteor.methods({
  async 'people.checkIn'(personId) {
    await checkIn(personId);
  },
  async 'people.checkOut'(personId) {
    await checkOut(personId);
  },
});
