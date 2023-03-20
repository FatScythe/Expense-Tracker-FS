// CSS
import "./App.css";

// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  // NotFound Component
  return (
    <BrowserRouter className='relative'>
      <Navbar />
      <Alert />
      <Routes>
        <Route path='/' element={isLoggedIn ? <Dashboard /> : <Hero />} />
        <Route path='/auth' element={<SignUp />} />
        <Route path='/edit' element={isLoggedIn ? <EditProfile /> : <Hero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
