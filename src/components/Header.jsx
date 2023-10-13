import { Link } from 'react-router-dom'
import logo from '../images/logo_mesto_header.png'

export default function Header(props) {
    return ( 
            <header className="header">
                <img className="header__logo" 
                src={logo} 
                alt="Логотип сервиса Место"
                />
                <nav className="header__auth">
                    <p className="header__text">{props.mail}</p>
                    <Link to={props.route} 
                    className="header__link" 
                    type="button" 
                    onClick={props.onClick}>{props.title}</Link>
                </nav>
            </header>
    )
}
