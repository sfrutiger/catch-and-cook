import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import axios from "axios";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./components/NotFound";
import CreatePost from "./components/createpost/CreatePost";
import PublicFooter from "./components/PublicFooter";
import PrivateFooter from "./components/PrivateFooter";
import PrivateMenu from "./components/PrivateMenu";
import PublicMenu from "./components/PublicMenu";

function App() {
  const [posts, setPosts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <AuthContextProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PublicRoute>
                <Feed posts={posts} />
                <PublicMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <PublicFooter setMenuOpen={setMenuOpen} />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="signup"
            element={
              <PublicRoute>
                <SignUpForm />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="signin"
            element={
              <PublicRoute>
                <SignInForm />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="signedin"
            element={
              <ProtectedRoute>
                <Feed posts={posts} />
                <PrivateMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <PrivateFooter setMenuOpen={setMenuOpen} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="createpost"
            element={
              <ProtectedRoute>
                <CreatePost setPosts={setPosts} posts={posts} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
