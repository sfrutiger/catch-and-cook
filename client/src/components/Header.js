const Header = () => {
  return (
    <div
      className="flex justify-center mt-4 cursor-pointer"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      <img src={require("../assets/logo1.png")} className="w-[60px]"></img>
      <div className="flex flex-col ml-4 mt-4">
        <h1 className="text-5xl font-header font-bold">
          Catch and Cook<span className="text-3xl">.app</span>
        </h1>
        <p className="font-thin">Share what you catch and how you cook it</p>
      </div>
    </div>
  );
};

export default Header;
