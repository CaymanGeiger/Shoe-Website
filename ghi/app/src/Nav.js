import { NavLink } from 'react-router-dom';
import "./Nav.css"
import { useAuth } from './Auth/AuthContext';
import { useLogout } from './Accounts/AccountLogOut';
import { AuthProvider } from './Auth/AuthContext';
import LogoutButton from './Accounts/AccountLogOut';
import { useNavigate } from 'react-router-dom';
import { useModal } from './Accounts/SignInModal';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faStar, faCartShopping, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from './ToastContext';




function Nav() {
    const { isAuthenticated } = useAuth();
    const handleLogout = useLogout();
    const navigate = useNavigate();
    const { openModal } = useModal();
    const { isActive } = useAuth();
    const { userId } = useAuth();
    const showToast = useToast();


    function handleFavoritesClick(){
      if (!(userId)) {
            openModal(true)
            showToast("Please log in first!", "error");
        } else {
        navigate('/shoes/favorites')
        }
    }

    function handlePersonClick() {
      if (!(userId)) {
            openModal(true)
            showToast("Please log in first!", "error");
        } else {
        navigate('/accounts/detail')
        }
    }


  return (
    <div className='navMainDiv'>
      <div className='navTop'>
          <ul className="accountBarUL">
            {!isAuthenticated &&(
              <>
              <li className="nav-item">
                <button className="btn accountButtons" onClick={openModal}>
                  Sign In
                </button>
              </li>
            </>
            )}
            {isAuthenticated &&(
              <>
              <div className='dotDiv'>
              <div className={`dot ${isActive === true ? 'filled' : ''}`}></div>
              </div>
                <li className="nav-item">
                    <LogoutButton/>
                </li>
              </>
              )}
          </ul>
      </div>
    <nav className="navbar navApp">
      <div className="divNav2">
        <FontAwesomeIcon icon={faShop} />
        <NavLink className="navbar-brand websiteTitle" to="/">Wardrobify</NavLink>
        <div className='pageLinks'>
        <ul className="menu">
          <li className="menu-item">
              Shoes
              <div className="submenu">
                  <ul>
                      <li className="nav-item">
                        <NavLink className="nav-link navLinks" to="/shoes">Catalog</NavLink>
                      </li>
                        <li className="nav-item navLinksDiv">
                          <NavLink className="nav-link navLinks" to="/shoes/create">Create Shoe</NavLink>
                        </li>
                  </ul>
              </div>
          </li>
        </ul>
        <ul className="menu">
          <li className="menu-item">
              Other
              <div className="submenu">
                  <ul>
                      <li className="nav-item">
                        <NavLink className="nav-link navLinks" to="/accounts">Accounts</NavLink>
                      </li>
                  </ul>
              </div>
          </li>
        </ul>
        </div>
      </div>
          <div className="heartIconDiv">
            <button>
                <FontAwesomeIcon onClick={handlePersonClick} className="personIcon"  icon={faUser} />
            </button>
            <button className='navButtons'>
                <FontAwesomeIcon onClick={handleFavoritesClick} className="heartIcon" icon={faHeart}/>
            </button>
            <button className='navButtons'>
                <FontAwesomeIcon className="cartIcon" icon={faCartShopping} />
            </button>
        </div>
    </nav>
    </div>
  )
}

export default Nav;
