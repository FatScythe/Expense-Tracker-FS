import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useUiContext } from "./context/uiContext";

// Component
import Navbar from "./component/navbar/navbar";

// Pages
import Hero from "./pages/hero/hero";
import SignUp from "./pages/signup/signup";

function App() {
  // const { h } = useUiContext();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* conditionally render to main page or Hero */}
        <Route path='/' element={<Hero />} />
        <Route path='/auth' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
