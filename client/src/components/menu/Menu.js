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
          <div className="w-full h-[60%] flex justify-center bg-secondary absolute bottom-0">
            <div className="max-w-[700px] w-full h-full relative flex items-center">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute right-5 top-5 cursor-pointer text-2xl p-3"
              >
                <FaTimes />
              </button>
              <DisplayInMenu setMenuOpen={setMenuOpen} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Menu;
