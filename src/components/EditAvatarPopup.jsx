import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from 'react';

export default function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar
 }) {
 
    const inputRef = useRef();
 
    function handleSumbit(e) {
       e.preventDefault();
       onUpdateAvatar({
          avatar: inputRef.current.value,
       });
    }
 
    useEffect(() => {
       inputRef.current.value = '';
    }, [isOpen]);
 
    return (
        <PopupWithForm
            title = "Обновить аватар"
            name = "avatar-profile"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSumbit}
      >
        <input 
            className="popup__form-input" 
            type="url" 
            placeholder="Ссылка на картинку" 
            name="avatar" 
            id="avatar" 
            minLength="2" 
            maxLength="200" 
            required
            ref={inputRef}
        />
        <span id="avatar-error" className="popup__error"></span>
      </PopupWithForm>
    )
 }