import { useContext } from 'react';
import Card from './Card.jsx';
import CurrentUserContext from './../contexts/CurrentUserContext.js';

export default function Main({
    onEditProfile, 
    onAddPlace, 
    onEditAvatar, 
    onCardClick, 
    onCardLike, 
    onCardDelete, 
    cards
}) {

    const currentUser = useContext(CurrentUserContext);

    return ( 
        <main>
            <section className="profile">
                <img 
                className="profile__image"  
                alt="Аватар профиля"
                src={currentUser.avatar}
                />
                <button 
                onClick={onEditAvatar} 
                className="profile__image-btn" 
                type="button">
                </button>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="profile__button-edit" type="button"></button>
                     </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" type="button"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        < Card 
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}


