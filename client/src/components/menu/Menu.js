import { FaTimes } from "react-icons/fa";
import DisplayInMenu from "./DisplayInMenu";

const Menu = ({ menuOpen, setMenuOpen }) => {
  return (
    <>
      {menuOpen ? (
        <div className="z-20 w-[100vw] h-[100vh] bg-black/[0.5] absolute top-0 text-light">
          <div
            onClick={() => setMenuOpen(false)}
            className="w-full h-[40%]"
          ></div>
          <div className="w-full h-[60%] flex items-center bg-secondary border-t-2 border-secondary absolute bottom-0">
            <FaTimes
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 cursor-pointer text-2xl"
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
