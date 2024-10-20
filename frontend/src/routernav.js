import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Register from './register';
import SignIn from "./signin";
import App from './App';

const router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
};

export default router;