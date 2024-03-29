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
          automatically retrieve the weather conditions so you can have an
          accurate log. Share your spots or keep them secret!
        </p>
        <div className="w-full flex flex-col items-center mt-12">
          <a
            href="https://www.freeprivacypolicy.com/live/6bb377d1-111c-4534-b55f-f6712329cf52"
            className="underline mb-2"
          >
            Privacy Policy
          </a>
          <p>
            © 2022{" "}
            <a href="https://www.frutiger.tech" className="underline">
              frutiger.tech
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
