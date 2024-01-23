import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signin from "./Pages/SignIn";
import Signup from "./Pages/SignUp";
import Account from "./Pages/Account";
import { AuthContextProvider } from "./context/authContext";
import ProtectedRoutes from "./Pages/ProtectedRoutes";

const App = () => {
  return (
    <section>
      <h1 className="text-center text-3xl font-bold">
        Firebase Auth And Context
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route
            path="/account"
            element={
              <ProtectedRoutes>
                <Account />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AuthContextProvider>
      {/* <Home /> */}
    </section>
  );
};
export default App;
