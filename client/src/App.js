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

function App() {
  const { isLoggedIn } = useUiContext();

  return (
    <BrowserRouter className='relative'>
      <Navbar />
      <Alert />
      <Routes>
        {/* conditionally render to main page or Hero */}
        <Route path='/' element={isLoggedIn ? <Dashboard /> : <Hero />} />
        <Route path='/auth' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
