import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const PrivateMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const logOut = () => {
    return signOut(auth);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setMenuOpen(false);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {menuOpen ? (
        <div className="w-[100vw] h-[100vh] bg-black/[0.6] z-10 absolute top-0">
          <div
            onClick={() => setMenuOpen(false)}
            className="w-full h-[40%]"
          ></div>
          <div className="w-full h-[60%] flex items-center bg-slate-600 absolute bottom-0">
            <FaTimes
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 cursor-pointer"
            />
            <div className="w-full h-[30%] flex flex-col items-center justify-around">
              <p className="menu-items">Settings</p>
              <p className="menu-items">About</p>
              <p className="menu-items">Invite friends</p>
              <p className="menu-items" onClick={handleLogout}>
                Sign Out
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PrivateMenu;
