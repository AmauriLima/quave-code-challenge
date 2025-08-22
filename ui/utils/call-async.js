import { Meteor } from 'meteor/meteor';

export const callAsync = (...args) =>
  new Promise((resolve, reject) => {
    Meteor.call(...args, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
