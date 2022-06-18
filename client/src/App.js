import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import Menu from "./components/Menu";
import RecipeDetails from "./components/RecipeDetails";
import ForgotPassword from "./components/ForgotPassword";
import About from "./components/About";
import UserFeed from "./components/UserFeed";

function App() {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [userFeedSkip, setUserFeedSkip] = useState(0);
  const [userFeedId, setUserFeedId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedPosition, setFeedPosition] = useState("");
  const routePath = useLocation();

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
    setFeedPosition(scrollTop);
    if (offsetHeight + scrollTop === scrollHeight) {
      switch (routePath.pathname) {
        case `/userfeed/${userFeedId}`:
          setUserFeedSkip(userPosts.length);
          break;
        default:
          setSkip(posts.length);
      }
    }
  };

  // get scroll position from session storage for scroll restoration
  useEffect(() => {
    if (feedPosition === 0 || feedPosition === NaN) {
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      setFeedPosition(parseInt(scrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [feedPosition]);

  // handle state on route changes to facillitate infinite scroll and scroll restoration
  useEffect(() => {
    if (routePath.pathname === "/signedin" || routePath.pathname === "/") {
      returnFeedToSamePosition(); // restore scroll position
      setUserFeedSkip(0); // reset skip for infinite scroll in user feed
      setUserPosts([]);
    }
  }, [routePath]);

  const returnFeedToSamePosition = () => {
    document.getElementById("App").scrollTo(0, feedPosition);
  };

  return (
    <AuthContextProvider>
      <div
        className="App overflow-y-scroll h-[100vh]"
        id="App"
        onScroll={handleScroll}
      >
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PublicRoute>
                <Header />
                <Feed
                  posts={posts}
                  feedPosition={feedPosition}
                  setUserFeedId={setUserFeedId}
                />
                <Footer setMenuOpen={setMenuOpen} />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="signup"
            element={
              <PublicRoute>
                <Header />
                <SignUpForm />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="signin"
            element={
              <PublicRoute>
                <Header />
                <SignInForm />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="recipedetails/:id"
            element={
              <>
                <Header />
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
                <Header />
                <Feed
                  posts={posts}
                  feedPosition={feedPosition}
                  setUserFeedId={setUserFeedId}
                />
                <Footer setMenuOpen={setMenuOpen} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="userfeed/:id"
            element={
              <ProtectedRoute>
                <UserFeed
                  userFeedSkip={userFeedSkip}
                  setUserFeedSkip={setUserFeedSkip}
                  userPosts={userPosts}
                  setUserPosts={setUserPosts}
                />
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
