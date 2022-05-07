import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Feed from "./components/Feed";
import LoginButton from "./components/LoginButton";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
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
            path="/"
            element={
              <>
                <Feed posts={posts} />
                <LoginButton />
              </>
            }
          />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
