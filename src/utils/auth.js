
function onResponse(res) {
    if (res.ok) {
        return res.json();
    } 
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}
export const BASE_URL = "https://auth.nomoreparties.co";

export function registerUser(email, password) {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(onResponse);
  }
  
  export function loginUser(email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(onResponse);
  }
  
  export function getToken(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(onResponse);
  }