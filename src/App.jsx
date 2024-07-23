import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogIn from "./components/auth/log-in";
import Hero from "./pages/home/hero";

function App() {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Hero />}
            // element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={<LogIn />}
            // element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            // element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
      </Router>
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
