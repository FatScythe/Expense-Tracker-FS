// CSS
import "./App.css";

// react-router-dom
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// context
import { useUiContext } from "./context/uiContext";

// Component
import Navbar from "./component/navbar/navbar";
import Alert from "./component/alert/alert";

// Pages
import Hero from "./pages/landing/hero";
import SignUp from "./pages/auth/signup";
import Dashboard from "./pages/dashboard/dashboard";
import EditProfile from "./pages/edit/edit";

function App() {
  const { isLoggedIn } = useUiContext();
  return (
    <BrowserRouter className='relative'>
      <Navbar />
      <Alert />
      <Routes>
        <Route path='/' element={isLoggedIn ? <Dashboard /> : <Hero />} />
        <Route path='/auth' element={<SignUp />} />
        <Route path='/edit' element={isLoggedIn ? <EditProfile /> : <Hero />} />
        <Route
          path='*'
          element={
            <div className='not-found'>
              <h1>Error: Page Not Found :( </h1>
              <Link to='/'>Return to HomePage</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// to run without build add to <  "proxy": "http://localhost:5000",> client's pkg.json file

export default App;
