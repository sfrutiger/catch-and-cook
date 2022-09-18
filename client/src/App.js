import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import axios from "axios";

//import components
import Header from "./components/Header";
import Feed from "./components/Feed";
import Footer from "./components/Footer";
import Menu from "./components/menu/Menu";

//import routes
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import NotFound from "./components/routes/NotFound";
import UserFeed from "./components/routes/UserFeed";
import MyPosts from "./components/routes/MyPosts";
import RecipeDetails from "./components/routes/RecipeDetails";
import SignInForm from "./components/routes/SignInForm";
import SignUpForm from "./components/routes/SignUpForm";
import CreatePost from "./components/routes/createpost/CreatePost";
import AddRecipe from "./components/routes/AddRecipe";
import ForgotPassword from "./components/routes/ForgotPassword";
import EditPost from "./components/EditPost";
import Contact from "./components/routes/Contact";

function App() {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [userFeedSkip, setUserFeedSkip] = useState(0);
  const [myFeedSkip, setMyFeedSkip] = useState(0);
  const [userFeedId, setUserFeedId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedPosition, setFeedPosition] = useState("");
  const routePath = useLocation();
  const [postEdited, setPostEdited] = useState(0);
  const [endOfPosts, setEndOfPosts] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts?skip=${skip}`);
      if (posts.length > 0 && skip !== 0 && response.data.length > 0) {
        setPosts([...posts, ...response.data]);
      } else if (response.data.length === 0 && skip !== 0) {
        setEndOfPosts(true);
      } else {
        setPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [skip]);

  useEffect(() => {
    setSkip(0);
    getPosts();
    setMyFeedSkip(0);
  }, [postEdited]);

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    setFeedPosition(scrollTop);
    if (offsetHeight + scrollTop === scrollHeight) {
      switch (routePath.pathname) {
        case `/userfeed/${userFeedId}`:
          setUserFeedSkip(userPosts.length);
          break;
        case "/myposts":
          setMyFeedSkip(myPosts.length);
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
    if (
      routePath.pathname === "/signedin" ||
      routePath.pathname === "/" ||
      routePath.pathname === "myposts"
    ) {
      returnFeedToSamePosition(); // restore scroll position
      setUserFeedSkip(0); // reset skip for infinite scroll in user feed
      setMyFeedSkip(0);
      setUserPosts([]);
      setMyPosts([]);
    }
  }, [routePath]);

  const returnFeedToSamePosition = () => {
    document.getElementById("App").scrollTo(0, feedPosition);
  };

  return (
    <AuthContextProvider>
      <div
        className="App overflow-y-scroll h-[calc(100vh_-_72px)]" //height must be vh minus height of foot plus at least one pixel for infinite scroll to work on pixel 3 xl
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
                  setSkip={setSkip}
                  endOfPosts={endOfPosts}
                />
                <Footer setMenuOpen={setMenuOpen} createPostVisible={true} />
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
            path="contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer setMenuOpen={setMenuOpen} createPostVisible={true} />
              </>
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
                  setSkip={setSkip}
                  endOfPosts={endOfPosts}
                />
                <Footer setMenuOpen={setMenuOpen} createPostVisible={true} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="userfeed/:id"
            element={
              <>
                <UserFeed
                  userFeedSkip={userFeedSkip}
                  setUserFeedSkip={setUserFeedSkip}
                  userPosts={userPosts}
                  setUserPosts={setUserPosts}
                />
                <Footer setMenuOpen={setMenuOpen} createPostVisible={true} />
              </>
            }
          />
          <Route
            exact
            path="myposts"
            element={
              <ProtectedRoute>
                <MyPosts
                  setPosts={setPosts}
                  posts={posts}
                  postEdited={postEdited}
                  setPostEdited={setPostEdited}
                  myPosts={myPosts}
                  setMyPosts={setMyPosts}
                  myFeedSkip={myFeedSkip}
                  setMyFeedSkip={setMyFeedSkip}
                />
                <Footer setMenuOpen={setMenuOpen} createPostVisible={true} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="createpost"
            element={
              <ProtectedRoute>
                <CreatePost setPosts={setPosts} posts={posts} />
                <Footer setMenuOpen={setMenuOpen} createPostVisible={false} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="addrecipe"
            element={
              <ProtectedRoute>
                <AddRecipe
                  setPosts={setPosts}
                  setMyPosts={setMyPosts}
                  posts={posts}
                  postEdited={postEdited}
                  setPostEdited={setPostEdited}
                  skip={skip}
                  setSkip={setSkip}
                />
                <Footer setMenuOpen={setMenuOpen} createPostVisible={false} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="editpost/:id"
            element={
              <ProtectedRoute>
                <EditPost
                  setPosts={setPosts}
                  setMyPosts={setMyPosts}
                  posts={posts}
                  postEdited={postEdited}
                  setPostEdited={setPostEdited}
                  skip={skip}
                  setSkip={setSkip}
                />
                <Footer setMenuOpen={setMenuOpen} createPostVisible={false} />
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
