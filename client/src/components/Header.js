const Header = () => {
  return (
    <div className="flex justify-center mt-4">
      <img src={require("../assets/logo1.png")} className="w-[60px]"></img>
      <div className="flex flex-col ml-6">
        <h1 className="text-5xl p-2 font-header font-bold">Catch and Cook</h1>
        <p className="font-thin">Share what you catch and how you cook it</p>
      </div>
    </div>
  );
};

export default Header;
