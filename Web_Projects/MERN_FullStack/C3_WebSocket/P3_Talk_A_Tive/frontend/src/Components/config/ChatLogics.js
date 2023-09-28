export const getSender = (loggedUser, users) => { // just 2 users in users if not a group chat
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
