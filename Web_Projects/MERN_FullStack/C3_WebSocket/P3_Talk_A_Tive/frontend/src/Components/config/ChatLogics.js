export const getSender = (loggedUser, users) => {
  // just 2 users in users if not a group chat
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  // just 2 users in users if not a group chat
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, curMsg, curMsgIndex, loggedinUserId) => {
  return (
    curMsgIndex < messages.length - 1 &&
    (messages[curMsgIndex + 1].sender._id !== curMsg.sender._id ||
      messages[curMsgIndex + 1].sender._id === undefined) &&
    messages[curMsgIndex].sender._id !== loggedinUserId
  );
};

export const isTargetLastMessage = (messages, curMsgIndex, loggedinUserId) => {
  return (
    curMsgIndex === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== loggedinUserId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    // is loggedin user
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender_id !== userId
  ) {
    return 33;
  } else if (
    // other user
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
