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
import Footer from "./components/Footer";
import PrivateMenu from "./components/PrivateMenu";
import PublicMenu from "./components/PublicMenu";
import RecipeDetails from "./components/RecipeDetails";
import ForgotPassword from "./components/ForgotPassword";
import About from "./components/About";

function App() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts?skip=${skip}`);
      if (posts.length > 0) {
        setPosts([...posts, ...response.data]);
      } else {
        setPosts(response.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getPosts();
  }, [skip]);

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop === scrollHeight) {
      setSkip(posts.length);
    }
  };

  return (
    <AuthContextProvider>
      <div className="App overflow-y-scroll h-[100vh]" onScroll={handleScroll}>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PublicRoute>
                <Feed posts={posts} />
                <PublicMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <Footer setMenuOpen={setMenuOpen} />
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
            path="recipedetails/:id"
            element={
              <>
                <RecipeDetails />
                <Footer setMenuOpen={setMenuOpen} />
              </>
            }
          />
          <Route
            exact
            path="forgotpassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route exact path="about" element={<About />} />
          <Route
            exact
            path="signedin"
            element={
              <ProtectedRoute>
                <Feed posts={posts} />
                <PrivateMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <Footer setMenuOpen={setMenuOpen} />
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
