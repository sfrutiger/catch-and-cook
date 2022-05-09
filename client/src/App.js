import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import axios from "axios";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./components/NotFound";
import CreatePost from "./components/createpost/CreatePost";
import CreatePostButton from "./components/CreatePostButton";

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
      console.log("get posts");
    } catch (error) {
      console.log(error);
    }
  };

  if (!posts.length) {
    getPosts();
  }

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
                <SignInButton />
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
                <SignOutButton />
                <CreatePostButton />
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
