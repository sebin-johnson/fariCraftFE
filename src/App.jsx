import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Project from "./pages/Project";
import { ToastContainer, Bounce } from 'react-toastify';
import { isAuthTokenContext } from "./Context/ContextShare";
import { useContext } from "react";

function App() {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={isAuthToken ? <Dashboard /> : <Home />} />
        <Route path={"/login"} element={<Auth />} />
        <Route path={"/register"} element={<Auth registerPage={'registerPage'} />} />
        <Route path={"/project"} element={<Project />} />
      </Routes>
      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
