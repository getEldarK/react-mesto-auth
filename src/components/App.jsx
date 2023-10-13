import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import api from './../utils/Api.js';
import * as auth from './../utils/auth.js';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import CurrentUserContext from './../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import resolve from "../images/resolve.svg";
import reject from "../images/reject.svg";
import InfoTooltip from './InfoTooltip.jsx';

export default function App() {

  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
    


  function onRegister(email, password) {
    auth.registerUser(email, password)
      .then(() => {
        setPopupImage(resolve);
        setPopupTitle("Вы успешно зарегестрировались!");
        navigate("/sign-in");
      })
      .catch(() =>{
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте еще раз.");
      })
      .finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth.loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
      navigate("/");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmailName(res.data.email);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, [])

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
    setIsImagePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.setLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err));
    } else {
      api.deleteLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
    }

    // api.changeLike(card._id, !isLiked).then((newCard) => {
    //   setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    // })
    // .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar (data) {
    api.editAvatarProfile(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/sign-in" element={
          <>
            <Header title="Регистрация" route="/sign-up"/>
            <Login onLogin={onLogin} />
          </>
        }/>
        <Route path="/sign-up" element={
          <>
            <Header title="Войти" route="/sign-in"/>
            <Register onRegister={onRegister} />
          </>
        }/>
        <Route exact path="/" element={
          <>
            <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
            <ProtectedRoute 
              component={Main}
              isLogged={isLoggedIn}
              onEditProfile = {handleEditProfileClick}
              onAddPlace ={handleAddPlaceClick}
              onEditAvatar ={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Footer />
          </>
        }/>
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>} 
        />
      </Routes>

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} 
      />
 
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm 
        title="Вы уверены?"
        name="delete-confirm"
        onClose={closeAllPopups}/>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />

      <InfoTooltip 
        image={popupImage} 
        title={popupTitle} 
        isOpen={infoTooltip} 
        onClose={closeAllPopups} 
      />

      </CurrentUserContext.Provider>
    </>
  );
}

