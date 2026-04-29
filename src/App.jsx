import { lazy, Suspense, useState } from "react";
import "./App.css";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar.jsx";
import TopNavbar from "./layout/TopNavbar.jsx";
import Loading from "./layout/Loading.jsx";
const Login = lazy(()=> import('./pages/LoginPage.jsx'))

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("auth") === "true");

  const handleLogin = () => {
    setIsAuth(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuth(false);
  };
  return (
    <>
      <Suspense fallback={<Loading />}>
        {isAuth ?<>
          <nav>
            <Navbar onLogout={handleLogout}/>
          </nav>
          <main>
            <Main />
          </main>
        </>: (
          <Login onLogin={handleLogin}/>
        )}
      </Suspense>
    </>
  );
}

export default App;
