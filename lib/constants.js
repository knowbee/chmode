exports.permissions = {
  user: {
    read: false,
    write: false,
    execute: false
  },
  group: {
    read: false,
    write: false,
    execute: false
  },
  other: {
    read: false,
    write: false,
    execute: false
  }
};

exports.questions = [
  {
    type: "checkbox",
    message: "user permissions",
    name: "user",
    choices: ["read", "write", "execute"]
  },
  {
    type: "checkbox",
    message: "group permissions",
    name: "group",
    choices: ["read", "write", "execute"]
  },
  {
    type: "checkbox",
    message: "other permissions",
    name: "other",
    choices: ["read", "write", "execute"]
  }
];
