export default function PopupWithForm({
  title, 
  name, 
  children, 
  isOpen, 
  onClose, 
  onSubmit
}) {
  return ( 
    <section className={`popup popup_${name} ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form className="popup__form" name={name} id="popupAvatarForm" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-button">Сохранить</button>
        </form>
      </div>
    </section>
  )
}