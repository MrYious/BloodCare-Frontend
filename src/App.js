import { Route, Routes } from "react-router-dom";

import ActiveRequests from "./components/ActiveRequests";
import Browse from "./components/Browse";
import Dashboard from "./pages/Dashboard";
import History from "./components/History";
import Home from "./components/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PendingRequests from "./components/PendingRequests";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Landing/>}>
        <Route index element={<Browse />} />
      </Route>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="dashboard" element={<Dashboard/>} >
        <Route index element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="requests/pending" element={<PendingRequests />} />
        <Route path="requests/active" element={<ActiveRequests />} />
        <Route path="history" element={<History />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </>);
}

export default App;
