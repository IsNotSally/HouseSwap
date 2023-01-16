
const BASE_URL = 'http://localhost:3001'



exports.login = (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.signup = (user) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.logout = (tokenName) => {
  localStorage.removeItem(tokenName);
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenName}`,
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.getUser = (id) => {
  return fetch(`${BASE_URL}/user/${id}`)
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

exports.getAllHouses = () => {
  return fetch(`${BASE_URL}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

// exports.getUserHouses = (userId) => {
//   return fetch(`${BASE_URL}/${userId}`)
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// }

exports.createMyHome = (userId, home) => {
  return fetch(`${BASE_URL}/dashboard/my-home`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({userId, home }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.createChat  = () => {
  return fetch(`${BASE_URL}/inbox`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.getChats = (id) => {
  return fetch(`${BASE_URL}/inbox/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.addMessages = (newMessage) => {
  return fetch(`${BASE_URL}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMessage),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.getAllMessages = (chatId) => {
  return fetch(`${BASE_URL}/message/${chatId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}