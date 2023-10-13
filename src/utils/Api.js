import {apiOptions} from './constants.js'

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    #onResponse(res) {
        if (res.ok) {
            return res.json();
        } 
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
    
    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
        })
        .then(res=> this.#onResponse(res))
      
    }
    
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res=> this.#onResponse(res))
    }

    //Редактирование профиля
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res=> this.#onResponse(res))
    }

    setLike(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res=> this.#onResponse(res))
    }

    deleteLike(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res=> this.#onResponse(res))
    }

    // Добавление новой карточки
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
              })
          })
        .then(res=> this.#onResponse(res))
    }
    // Обновление аватара пользователя
    editAvatarProfile(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
              })
        })
        .then(res=> this.#onResponse(res))
    }

    deleteCard(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res=> this.#onResponse(res))
    }
}

const api = new Api(apiOptions);
export default api;