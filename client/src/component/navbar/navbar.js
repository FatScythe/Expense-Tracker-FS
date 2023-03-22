import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

// Context
import { useUiContext } from "../../context/uiContext";
import { useUserContext } from "../../context/userContext";

// Components
import {
  ArrowRight,
  Edit,
  HarmburgerMenu,
  Info,
  Logout,
  Settings,
  Close,
} from "../icons/icons";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, showAlert } = useUiContext();

  return (
    <div className='top-nav'>
      <nav>
        <div className='container'>
          <a href='/'>Expense Tracker</a>
          {isLoggedIn && (
            <User
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              showAlert={showAlert}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

const User = ({ isLoggedIn, setIsLoggedIn, showAlert }) => {
  const { getUserFromLocalStorage, removeUserFromLocalStorage } =
    useUserContext();
  const { isOptionOpen, setIsOptionOpen } = useUiContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    showAlert(true, "success", "Logging Out...");
    removeUserFromLocalStorage();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className='user-nav'>
      <p className='hidden md:block'>
        Welcome {getUserFromLocalStorage().user.name}
      </p>
      <div onClick={() => setIsOptionOpen(!isOptionOpen)}>
        {isOptionOpen ? <Close /> : <HarmburgerMenu />}
        <img
          src={getUserFromLocalStorage().user.image}
          alt={getUserFromLocalStorage().user.name}
          draggable={false}
          className='hidden md:block'
        />
        <ul className={`option ${isOptionOpen ? "max-h-64" : "max-h-0"}`}>
          <div className='title'>
            <img
              src={getUserFromLocalStorage().user.image}
              alt={getUserFromLocalStorage().user.name}
              draggable={false}
            />
            <p className='text-sm'>{getUserFromLocalStorage().user.name}</p>
          </div>
          <div className='links' onClick={() => setIsOptionOpen(false)}>
            <Link to='/edit'>
              <li>
                <span>
                  <Edit /> Edit Profile
                </span>
                <ArrowRight />
              </li>
            </Link>

            <Link to='/'>
              <li>
                <span>
                  <Settings /> Settings
                </span>
                <ArrowRight />
              </li>
            </Link>

            <Link to='/'>
              <li>
                <span>
                  <Info /> About
                </span>
                <ArrowRight />
              </li>
            </Link>
            <Link onClick={handleLogOut}>
              <li>
                <span>
                  <Logout /> Logout
                </span>
                <ArrowRight />
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
