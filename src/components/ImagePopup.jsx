export default function ImagePopup({card, isOpen, onClose}) {
  return ( 
    <section className={`popup popup_opened-big-img ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__img-container">
        <button className="popup__close-button" onClick={onClose} type="button"></button>
        <img 
          className="popup__picture"
          src={card.link}
          alt={card.name}
          />
        <h3 className="popup__img-title">{card.name}</h3>
      </div>
    </section>
  )
}