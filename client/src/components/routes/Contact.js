import { useState } from "react";
import emailjs from "emailjs-com";
import { UserAuth } from "../../context/AuthContext";

const Contact = ({ setDisplayCase }) => {
  const { user } = UserAuth();
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [subject, setSubject] = useState("Inquiry with no subject");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(user ? user.email : "");

  const sendEmail = (e) => {
    e.preventDefault();

    var templateParams = {
      type: "General inquiry",
      email: email,
      subject: subject,
      message: message,
    };

    emailjs
      .send(
        "default_service",
        "catch_and_cook_support",
        templateParams,
        "aEwWQf9sNli1z8mmf"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setConfirmSubmit(!confirmSubmit);
    setTimeout(() => {
      setConfirmSubmit(false);
    }, 3000);
    e.target.reset();
  };

  return (
    <div name="contact" className="w-full h-screen flex justify-center">
      <div className="w-[50%] mt-16">
        <h1 className="">Submit your inquiry below</h1>
        <div className="w-full flex flex-col items-center">
          <form
            className="flex flex-col py-2 w-full md:w-[75%]"
            onSubmit={(e) => sendEmail(e)}
          >
            {!user ? (
              <>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              ""
            )}

            <label>Subject</label>
            <input
              type="text"
              name="subject"
              required
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              name="message"
              required
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="buttons mt-2 h-[40px]">Send request</button>
          </form>
          <button
            className="buttons mt-0 h-[40px]"
            onClick={() => {
              setDisplayCase("settings");
            }}
          >
            Cancel
          </button>
          <p className={!confirmSubmit ? "hidden" : "flex text-green-500"}>
            Message sent
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
