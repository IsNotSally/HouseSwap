
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

exports.getUser = (userId) => {
  return fetch(`${BASE_URL}/user/${userId}`)
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

exports.getAllHouses = () => {
  return fetch(`${BASE_URL}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.getUserHouses = (userId) => {
  return fetch(`${BASE_URL}/dashboard/${userId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.getHouseById = (id) => {
  return fetch(`${BASE_URL}/${id}`)
  .then((res) => res.json())
  .catch((err) => console.log(err));
}
exports.createMyHome = (userId, form) => {
  return fetch(`${BASE_URL}/dashboard/my-home`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({userId, form}),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.createChat  = (senderId, receiverId) => {
  return fetch(`${BASE_URL}/inbox`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({senderId, receiverId}),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.getChats = (id) => {
  return fetch(`${BASE_URL}/inbox/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

exports.findChat = (firstId, secondId) =>{
  return fetch(`${BASE_URL}/find/${firstId}/${secondId}`)
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

