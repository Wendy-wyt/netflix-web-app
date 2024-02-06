import "./app.scss"
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import NotFound from "./pages/notfound/NotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

const App = () => {
  const user = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? (<Home />) : (<Navigate to="/register" replace />)} />
        <Route path="/series" element={user ? (<Home type="series" />) : (<Navigate to="/register" replace />)} />
        <Route path="/movies" element={user ? (<Home type="movie" />) : (<Navigate to="/register" replace />)} />
        <Route path="/login" element={user ? (<Navigate to="/" replace />) : (<Login />)} />
        <Route path="/register" element={user ? (<Navigate to="/" replace />) : (<Register />)} />
        <Route path="/watch" element={user ? (<Watch />) : (<Navigate to="/register" replace />)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;