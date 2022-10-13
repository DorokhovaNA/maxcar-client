import { useStore } from "effector-react";
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { AdPage } from "./pages/AdPage/AdPage";
import { AdsPage } from "./pages/AdsPage/AdsPage";
import { Alert } from "./components/Alert/Alert";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { MainPage } from "./pages/MainPage/MainPage";
import { $alert } from "./context/alert";
import { $auth, setAuth, setUsername } from "./context/auth";
import { getAuthDataFromLS, removeUser } from "./utils/auth";
import { About } from "./pages/About/About";
import { Contacts } from "./pages/Contacts/Contacts";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  const isLoggedIn = useStore($auth);
  const alert = useStore($alert);

  useEffect(() => {
    const auth = getAuthDataFromLS();

    if (!auth || !auth.access_token || !auth.refresh_token) {
      removeUser();
    } else {
      setAuth(true);
      setUsername(auth.username);
    }
  }, []);

  return (
    <div className="App">
      <div className="d-flex flex-column min-vh-100">
        <Router>
          <Header />
          {alert.alertText && <Alert props={alert} />}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/registration"
              element={
                isLoggedIn ? (
                  <Navigate to={"/"} />
                ) : (
                  <AuthPage type="registration" />
                )
              }
            />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/ads" element={<AdsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/ads/:id" element={<AdPage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
