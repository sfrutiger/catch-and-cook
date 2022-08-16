const Switch = ({ value, setValue }) => {
  const handleClick = () => {
    setValue(!value);
  };

  switch (value) {
    case false:
      return (
        <div
          className="cursor-pointer bg-red-500 w-16 flex-col items-start rounded"
          onClick={handleClick}
        >
          <div className="w-[50%] h-full bg-white rounded"></div>
        </div>
      );
    case true:
      return (
        <div
          className="cursor-pointer bg-green-500 w-16 flex flex-col items-end rounded"
          onClick={handleClick}
        >
          <div className="w-[50%] h-full bg-white rounded"></div>
        </div>
      );
  }
};

export default Switch;
