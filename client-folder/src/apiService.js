
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
//   return fetch(`${BASE_URL}/dashboard/${userId}`)
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

// exports.sendMessages = (id, message) => {
//   return fetch(`${BASE_URL}/dashboard/inbox/`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({id, message}),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// }

// exports.getAllMessages = (id) => {
//   return fetch(`${BASE_URL}/dashboard/inbox`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(id),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// }