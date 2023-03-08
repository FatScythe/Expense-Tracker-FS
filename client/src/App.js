import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUiContext } from "./context/uiContext";

import Post from "./hooks/Post";

// Component
import Navbar from "./component/navbar/navbar";

// Pages
import Hero from "./pages/landing/hero";
import SignUp from "./pages/auth/signup";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  const { isLoggedIn } = useUiContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* conditionally render to main page or Hero */}
        <Route path='/' element={isLoggedIn ? <Dashboard /> : <Hero />} />
        <Route path='/auth' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
