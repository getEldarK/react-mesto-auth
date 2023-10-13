import CurrentUserContext from './../contexts/CurrentUserContext.js';
import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.jsx';

export default function EditFrofilePopup({
    isOpen,
    onClose,
    onUpdateUser
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setDescription(e.target.value);
    }

    function handleSumbit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm
            title = "Редактировать профиль"
            name = "edit-profile"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSumbit}
        >
        <input 
            className="popup__form-input" 
            type="text" placeholder="Имя" 
            name="name" 
            id="inputName" 
            minLength="2" 
            maxLength="40" 
            required
            value={name || ''}
            onChange={handleChangeName}/>
        <span id="inputName-error" className="popup__error"></span>
        <input 
            className="popup__form-input" 
            type="text" 
            placeholder="О себе" 
            name="job" 
            id="inputJob" 
            minLength="2" 
            maxLength="200" 
            required
            value={description || ''}
            onChange={handleChangeAbout}/>
        <span id="inputJob-error" className="popup__error"></span>
        </PopupWithForm>
    )
}