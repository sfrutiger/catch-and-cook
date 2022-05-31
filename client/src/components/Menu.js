import { FaTimes } from "react-icons/fa";
import DisplayInMenu from "./DisplayInMenu";

const Menu = ({ menuOpen, setMenuOpen }) => {
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
            <DisplayInMenu setMenuOpen={setMenuOpen} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Menu;
