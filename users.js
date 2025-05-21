const users = [];

function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

function getUserById(id) {
  return users.find(user => user.id === id);
}

function addUser(user) {
  users.push(user);
}

module.exports = {
  getUserByEmail,
  getUserById,
  addUser
};
