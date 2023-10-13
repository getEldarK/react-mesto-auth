import CurrentUserContext from './../contexts/CurrentUserContext.js';
import { useContext } from 'react';

export default function Card({
  card,
  onCardClick, 
  onCardLike, 
  onCardDelete
}) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__like-button ${isLiked && 'elements__like-button_active'}`);

    function handleCardClick() {
      onCardClick(card);
    }

    function handleLikeClick() {
      onCardLike(card);
    }

    function handleDeleteClick() {
      onCardDelete(card)
    }

    return ( 
      <li className="elements__items" >
        <img 
          className="elements__image"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}/>
        <div className="elements__item">
          <h2 className="elements__title">{card.name}</h2>
          <div className="elements__like-container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <span className="elements__like-button_sum">{card.likes.length}</span>
          </div>
        </div>
        {isOwn && (<button className="elements__delete-button" type="button" onClick={handleDeleteClick}></button>)}
      </li>
    )
}