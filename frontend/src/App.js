import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AppWrapper,
  Dashboard,
  Login,
  Register,
  Home,
  History,
  Settings,
  Devices,
  AddDevice,
} from "./pages";

import "antd/dist/antd.min.css";
import "./styles/app.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppWrapper />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Devices />} />
            <Route path="devices" element={<Devices />} />
            <Route path="add-device" element={<AddDevice />} />
            <Route path="history" element={<History />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
