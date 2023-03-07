import "./navbar.css";
import { useUiContext } from "../../context/uiContext";
const Navbar = () => {
  const { isLoggedIn } = useUiContext();

  return (
    <nav>
      <div className='container'>
        <a href='/'>Expense Tracker</a>
        {isLoggedIn && <User />}
      </div>
    </nav>
  );
};

const User = () => {
  return (
    <div className='user-nav'>
      <p>Welcome User </p>
      <img
        src='https://res.cloudinary.com/dg0mkn4ld/image/upload/v1677053900/Expense-tracker-app/avatar_qirbmo.jpg'
        alt='user'
      />
    </div>
  );
};

export default Navbar;
