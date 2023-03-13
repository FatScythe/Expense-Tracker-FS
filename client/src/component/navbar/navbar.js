import "./navbar.css";
import { useUiContext } from "../../context/uiContext";
import { useUserContext } from "../../context/userContext";

const Navbar = () => {
  const { isLoggedIn } = useUiContext();

  return (
    <div className='top-nav'>
      <nav>
        <div className='container'>
          <a href='/'>Expense Tracker</a>
          {isLoggedIn && <User />}
        </div>
      </nav>
    </div>
  );
};

const User = () => {
  const { getUserFromLocalStorage } = useUserContext();

  return (
    <div className='user-nav'>
      <p>Welcome User </p>
      <img
        src={getUserFromLocalStorage().user.image}
        alt={getUserFromLocalStorage().user.name}
        draggable={false}
      />
    </div>
  );
};

export default Navbar;
