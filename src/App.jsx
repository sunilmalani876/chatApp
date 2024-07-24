import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LogIn from "./components/auth/log-in";
import Hero from "./pages/home/hero";
import Chat from "./pages/chat";
import NotFound from "./pages/404page";
import { useAuthContext } from "./context/useAuthContext";

function App() {
  const { token } = useAuthContext();
  return (
    <div className="absolute top-0 z-[-2] min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] flex justify-center items-center">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Hero />}
            // element={token ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            // element={<LogIn />}
            element={token ? <Navigate to="/chat" /> : <LogIn />}
          />
          <Route
            path="/chat"
            element={token ? <Chat /> : <Navigate to="/" />}
            // element={authUser ? <Navigate to="/" /> : <SignUp />}
          >
            <Route path="" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
