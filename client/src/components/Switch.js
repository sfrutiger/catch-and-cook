const Switch = ({ variable, value, setValue }) => {
  const handleClick = () => {
    setValue(!value);
  };

  return (
    <div className="cursor-pointer flex" onClick={handleClick}>
      <div
        className={`cursor-pointer w-16 h-[1.5rem] flex flex-col rounded ${
          value ? "bg-green-500 items-end" : "bg-red-500 items-start"
        } }`}
      >
        <div className="w-[50%] h-full bg-white rounded"></div>
      </div>
      <p className={`${value ? "" : "opacity-50"} ml-2`}>{variable}</p>
    </div>
  );
};

export default Switch;
