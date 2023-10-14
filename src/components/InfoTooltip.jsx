export default function InfoTooltip(props) {
    return (
      <div className={`popup ${props.isOpen ? 'popup_is-opened' : ""}`} onClick={props.onCloseClick}>
        <div className="popup__info">
          <img className="popup__status" src={props.image} alt={props.title}/>
          <h2 className="popup__message">{props.title}</h2>
          <button className="popup__close-button" type="button" onClick={props.onClose}/>
        </div>
      </div>
    );
  }