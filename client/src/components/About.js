const About = () => {
  return (
    <div className="w-full flex flex-col items-center mt-8">
      <div className="w-[500px] max-w-[80%]">
        <p className="mb-4 indent-4">
          Catch and Cook is an application that allows you to share what you
          have caught, hunted, foraged, or trapped and the recipes that you
          cooked.
        </p>
        <p className="mb-4 indent-4">
          After you enter the location, date, and time, Catch and Cook will
          automatically retrieve the weather and tide conditions so you can have
          an accurate log. Share your spots or keep them secret!
        </p>
      </div>
    </div>
  );
};

export default About;
