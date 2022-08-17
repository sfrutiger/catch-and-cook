const Switch = ({ value, setValue }) => {
  const handleClick = () => {
    setValue(!value);
  };

  return (
    <div
      className={`cursor-pointer w-16 flex flex-col rounded ${
        value ? "bg-red-500 items-start" : "bg-green-500 items-end"
      } }`}
      onClick={handleClick}
    >
      <div className="w-[50%] h-full bg-white rounded"></div>
    </div>
  );
};

export default Switch;
