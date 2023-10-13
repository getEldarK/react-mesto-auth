import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from 'react';

export default function AddPlacePopup({
   isOpen,
   onClose,
   onAddPlace
 }) {
 
   const [name, setName] = useState('');
   const [link, setLink] = useState('');
 
   useEffect(() => {
      setName('');
      setLink('');
   }, [isOpen]);
 
   function handleNameChange(e) {
      setName(e.target.value);
   }
 
   function handleLinkChange(e) {
      setLink(e.target.value);
   }
 
   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
         name,
         link
      });
   }
 
   return (
      <PopupWithForm
        title = "Новое место"
        name = "add-card"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
      <input 
         className="popup__form-input" 
         type="text"
         placeholder="Название" 
         name="name" 
         id="inputPlaceName" 
         required
         onChange={handleNameChange}
         value={name}/>
      <span id="inputPlaceName-error" className="popup__error"></span>
      <input 
         className="popup__form-input" 
         type="url" 
         placeholder="Ссылка на картинку" 
         name="link" 
         id="inputLink" 
         required
         onChange={handleLinkChange}
         value={link}/>
      <span id="inputLink-error" className="popup__error"></span>
      </PopupWithForm>
    )
 }