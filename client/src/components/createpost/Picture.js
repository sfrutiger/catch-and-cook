const Picture = ({ nextStep }) => {
  return (
    <div>
      <h1>Add a picture</h1>
      <button onClick={() => nextStep()} className="buttons w-[150px]">
        Next
      </button>
    </div>
  );
};

export default Picture;
