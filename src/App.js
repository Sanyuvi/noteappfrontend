import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";

import { Register } from "./Components/Register";
import { ForgotPassword } from "./Components/ForgotPassword";
import { Dashboard } from "./Components/Dashboard";
import { AddNotes } from "./Components/AddNotes";
import { EditNotes } from "./Components/EditNotes";
import { Searchbar } from "./Components/Searchbar";
import Login from "./Components/Login";
import UserActivation from "./Components/userActivation";
import VerifyRandomString from "./Components/verifyRandomString";
import ResetPassword from "./Components/resetPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/activate" element={<UserActivation />} />
        <Route path="/getAllNotes/:userId" element={<Dashboard />} />
        <Route path="/searchNotes/:userId" element={<Searchbar />} />
        <Route path="/createNote" element={<AddNotes />} />
        <Route path="/editNote/:id" element={<EditNotes />} />
        <Route
          path="/verifyRandomString/:randomString"
          element={<VerifyRandomString />}
        />
        <Route
          path="/resetPassword/:randomString"
          element={<ResetPassword />}
        />
      </Routes>
    </div>
  );
}

export default App;
