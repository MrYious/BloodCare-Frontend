import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="dashboard" element={<Dashboard/>} >
        <Route index element={<>Browse</>} />
        <Route path="requests/pending" element={<>Pending Requests</>} />
        <Route path="requests/active" element={<>Active Requests</>} />
        <Route path="history" element={<>History</>} />
        <Route path="reviews" element={<>Reviews</>} />
      </Route>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </>);
}

export default App;
